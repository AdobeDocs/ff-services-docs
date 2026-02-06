#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const CONFIG_FILENAME = ".hub-rules.json";
const DEFAULT_CONFIG = {
  hubRepoUrl: "",
  hubBranch: "main",
  hubRepoPath: ".hub-rules",
  hubRulesDir: ".cursor/rules",
  mode: "symlink",
  tracked: {},
};

function execGit(args, cwd) {
  try {
    return execFileSync("git", args, {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
    })
      .toString()
      .trim();
  } catch (error) {
    const stderr = error.stderr ? error.stderr.toString().trim() : "";
    throw new Error(stderr || error.message);
  }
}

function getRepoRoot() {
  return execGit(["rev-parse", "--show-toplevel"], process.cwd());
}

function getConfigPath(repoRoot) {
  return path.join(repoRoot, CONFIG_FILENAME);
}

function loadConfig(repoRoot) {
  const configPath = getConfigPath(repoRoot);
  if (!fs.existsSync(configPath)) {
    return null;
  }
  const raw = fs.readFileSync(configPath, "utf8");
  return JSON.parse(raw);
}

function saveConfig(repoRoot, config) {
  const configPath = getConfigPath(repoRoot);
  fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

function normalizeAgentName(name) {
  if (!name) return "";
  return name.endsWith(".mdc") ? name : `${name}.mdc`;
}

function parseArgs(argv) {
  const args = [];
  const options = {};
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (!value.startsWith("--")) {
      args.push(value);
      continue;
    }
    const [key, inlineValue] = value.split("=");
    if (inlineValue !== undefined) {
      options[key] = inlineValue;
      continue;
    }
    const nextValue = argv[i + 1];
    if (nextValue && !nextValue.startsWith("--")) {
      options[key] = nextValue;
      i += 1;
      continue;
    }
    options[key] = true;
  }
  return { args, options };
}

function usage() {
  console.log(`hubrules - use shared Cursor rules from a hub repo

Usage:
  hubrules init --hub-url <url> [--branch <branch>] [--path <dir>]
  hubrules list
  hubrules use <agent-name> [--force] [--all]
  hubrules remove <agent-name> [--force] [--all]
  hubrules status

Notes:
  - Defaults to symlink mode for hub rules.
  - Run from within any git repo (spoke).
  - Config stored in ${CONFIG_FILENAME}.
`);
}

function ensureConfig(repoRoot) {
  const config = loadConfig(repoRoot);
  if (!config) {
    throw new Error(
      `Missing ${CONFIG_FILENAME}. Run "hubrules init --hub-url <url>" first.`
    );
  }
  return config;
}

function getHubRulesPath(repoRoot, config) {
  return path.resolve(repoRoot, config.hubRepoPath, config.hubRulesDir);
}

function initCommand(repoRoot, options) {
  const existing = loadConfig(repoRoot);
  if (existing && !options["--force"]) {
    console.log(
      `Config already exists at ${CONFIG_FILENAME}. Use --force to overwrite.`
    );
    return;
  }

  const hubRepoUrl = options["--hub-url"] || options["--hubRepoUrl"];
  if (!hubRepoUrl) {
    throw new Error("Missing --hub-url.");
  }
  const hubBranch = options["--branch"] || DEFAULT_CONFIG.hubBranch;
  const hubRepoPath = options["--path"] || DEFAULT_CONFIG.hubRepoPath;

  const hubPath = path.resolve(repoRoot, hubRepoPath);
  if (!fs.existsSync(hubPath)) {
    execGit(
      ["clone", "--branch", hubBranch, "--single-branch", hubRepoUrl, hubPath],
      repoRoot
    );
  } else if (!fs.existsSync(path.join(hubPath, ".git"))) {
    throw new Error(`${hubRepoPath} exists but is not a git repo.`);
  }

  const config = {
    ...DEFAULT_CONFIG,
    hubRepoUrl,
    hubBranch,
    hubRepoPath,
  };
  saveConfig(repoRoot, config);
  console.log(`Initialized ${CONFIG_FILENAME}.`);
}

function listCommand(repoRoot, config) {
  const hubRulesPath = getHubRulesPath(repoRoot, config);
  if (!fs.existsSync(hubRulesPath)) {
    throw new Error(`Hub rules directory not found: ${hubRulesPath}`);
  }

  const entries = fs.readdirSync(hubRulesPath).filter((file) => file.endsWith(".mdc"));
  if (entries.length === 0) {
    console.log("No hub rules found.");
    return;
  }

  entries.forEach((file) => {
    const fullPath = path.join(hubRulesPath, file);
    const contents = fs.readFileSync(fullPath, "utf8");
    const descriptionMatch = contents.match(/^\s*description:\s*(.+)\s*$/m);
    const description = descriptionMatch ? descriptionMatch[1].trim() : "";
    const line = description ? `${file} - ${description}` : file;
    console.log(line);
  });
}

function useCommand(repoRoot, config, agentName, options) {
  const hubRulesPath = getHubRulesPath(repoRoot, config);
  const localRulesDir = path.join(repoRoot, ".cursor", "rules");
  fs.mkdirSync(localRulesDir, { recursive: true });
  const shouldUseAll = Boolean(options["--all"]);
  const normalized = normalizeAgentName(agentName);
  if (!normalized && !shouldUseAll) {
    throw new Error("Missing agent name.");
  }

  const candidates = shouldUseAll
    ? fs.readdirSync(hubRulesPath).filter((file) => file.endsWith(".mdc"))
    : [normalized];

  if (candidates.length === 0) {
    console.log("No hub rules found.");
    return;
  }

  let linked = 0;
  candidates.forEach((file) => {
    const hubFilePath = path.join(hubRulesPath, file);
    if (!fs.existsSync(hubFilePath)) {
      if (!shouldUseAll) {
        throw new Error(`Hub rule not found: ${file}`);
      }
      return;
    }

    const localPath = path.join(localRulesDir, file);
    if (fs.existsSync(localPath)) {
      const stats = fs.lstatSync(localPath);
      if (stats.isSymbolicLink()) {
        const target = fs.readlinkSync(localPath);
        if (path.resolve(localRulesDir, target) === hubFilePath) {
          if (!shouldUseAll) {
            console.log(`Already linked: ${file}`);
          }
          return;
        }
      }
      if (!options["--force"]) {
        if (!shouldUseAll) {
          throw new Error(`${file} already exists. Use --force to replace it.`);
        }
        return;
      }
      fs.rmSync(localPath, { force: true });
    }

    fs.symlinkSync(hubFilePath, localPath, "file");
    config.tracked[file] = {
      hubPath: path.relative(repoRoot, hubFilePath),
      localPath: path.relative(repoRoot, localPath),
      mode: "symlink",
    };
    linked += 1;
  });

  saveConfig(repoRoot, config);
  if (shouldUseAll) {
    console.log(`Linked ${linked} hub rules.`);
  } else {
    console.log(`Linked ${normalized}.`);
  }
}

function removeCommand(repoRoot, config, agentName, options) {
  const shouldRemoveAll = Boolean(options["--all"]);
  const normalized = normalizeAgentName(agentName);
  if (!normalized && !shouldRemoveAll) {
    throw new Error("Missing agent name.");
  }

  const candidates = shouldRemoveAll
    ? Object.keys(config.tracked || {})
    : [normalized];

  if (candidates.length === 0) {
    console.log("No borrowed hub rules.");
    return;
  }

  let removed = 0;
  candidates.forEach((file) => {
    const localPath = path.join(repoRoot, ".cursor", "rules", file);
    if (!fs.existsSync(localPath)) {
      delete config.tracked[file];
      return;
    }

    const stats = fs.lstatSync(localPath);
    if (!stats.isSymbolicLink() && !options["--force"]) {
      if (!shouldRemoveAll) {
        throw new Error(
          `${file} is not a symlink. Use --force to remove anyway.`
        );
      }
      return;
    }

    fs.rmSync(localPath, { force: true });
    delete config.tracked[file];
    removed += 1;
  });

  saveConfig(repoRoot, config);
  if (shouldRemoveAll) {
    console.log(`Removed ${removed} hub rules.`);
  } else {
    console.log(`Removed ${normalized}.`);
  }
}

function statusCommand(config) {
  const tracked = Object.entries(config.tracked || {});
  if (tracked.length === 0) {
    console.log("No borrowed hub rules.");
    return;
  }
  tracked.forEach(([name, meta]) => {
    console.log(`${name} -> ${meta.hubPath} (${meta.mode})`);
  });
}

function main() {
  const argv = process.argv.slice(2);
  const { args, options } = parseArgs(argv);
  const command = args[0];

  if (!command || options["--help"] || command === "help") {
    usage();
    return;
  }

  const repoRoot = getRepoRoot();

  try {
    switch (command) {
      case "init":
        initCommand(repoRoot, options);
        break;
      case "list":
        listCommand(repoRoot, ensureConfig(repoRoot));
        break;
      case "use":
        useCommand(repoRoot, ensureConfig(repoRoot), args[1], options);
        break;
      case "remove":
        removeCommand(repoRoot, ensureConfig(repoRoot), args[1], options);
        break;
      case "status":
        statusCommand(ensureConfig(repoRoot));
        break;
      default:
        usage();
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

main();
