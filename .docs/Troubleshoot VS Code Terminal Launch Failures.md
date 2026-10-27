---
title: Troubleshoot VS Code Terminal Launch Failures
source: https://code.visualstudio.com/docs/supporting/troubleshoot-terminal-launch
created: 2026-10-27
tags:
  - vscode
  - troubleshooting
  - terminal
  - wsl
  - ssh
  - devtools
---

# Troubleshoot Terminal Launch Failures in VS Code

## Identify the Failure

| Error / Symptom | Troubleshooting Path |
|---|---|
| Path to shell executable does not exist | Check settings & working directory, select an installed shell |
| Starting directory (cwd) does not exist | Check directory named in the error |
| Terminal process failed to launch (exit code) | Test shell outside editor, isolate startup customization |
| Terminal process terminated with exit code | Shell started successfully — check last output & command |
| Native exception occurred during launch | Windows: see Windows issues; Other: test shell directly & enable trace logging |
| Terminal restarts/closes repeatedly | Isolate shell integration, capture trace logs |
| WSL exits with code 1 | Check WSL default distribution & status |

> **Note:** For remote sessions (SSH/WSL/containers), verify paths & settings **on the remote host**.

---

## Troubleshooting Steps

### 1. Try an installed shell
- Open terminal dropdown → select another shell
- Use **Terminal: Select Default Profile** to change default
- Keep VS Code, shell & OS updated

### 2. Check settings & working directory
- `Ctrl+Shift+P` → **Preferences: Open Settings (UI)** → search `@modified terminal.integrated`
- Key settings to verify:
  - `terminal.integrated.defaultProfile.<platform>`
  - `terminal.integrated.profiles.<platform>`
  - `terminal.integrated.cwd`
  - `terminal.integrated.env.<platform>`
  - `terminal.integrated.inheritEnv`

### 3. Test the shell outside VS Code
Run these in an external terminal:
| Shell | Command |
|---|---|
| PowerShell 7 | `pwsh -NoProfile` |
| PowerShell (legacy) | `powershell.exe -NoProfile` |
| Bash | `bash --noprofile --norc` |
| Zsh | `zsh -f` |
| Command Prompt | `cmd.exe /d` |

✅ Works outside? Issue is in **startup config** or **shell integration**.

### 4. Isolate shell integration
- Set `terminal.integrated.shellIntegration.enabled`: `false`
- Create new terminal
- ✅ Works? Conflict with shell integration — restore setting & compare startup files

### 5. Enable trace logging
1. `Ctrl+Shift+P` → **Developer: Set Log Level...** → `Trace`
2. Reproduce the issue
3. `Ctrl+Shift+P` → **Developer: Open Log...** → select **Terminal** & **Pty Host**
4. Save logs, redact sensitive info, restore log level

---

## Common Issues

### 🪟 Windows
- **Disable Compatibility Mode** → Right-click VS Code → Properties → Compatibility → Uncheck "Run in compatibility mode"
- **ConPTY** — WinPTY removed in v1.109; no need to change this setting anymore
- Error code `5` — permission denied
- Error code `267` — invalid directory path
- Error code `1260` — blocked by system policy

### 🐧 WSL Exit Code 1
```powershell
wsl --status
wsl --list --verbose
wsl --set-default "YourDistroName"
