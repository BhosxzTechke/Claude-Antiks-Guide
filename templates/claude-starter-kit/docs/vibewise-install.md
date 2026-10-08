# Installing VibeWise (Claude Code plugin) on Windows

VibeWise: "You build. AI writes." A learning mode where Claude asks for your approach
first, explains concepts, and writes the code you agree on.
Source: https://github.com/nykooi1/vibe-wise (community plugin, not Anthropic-reviewed)

## Using it in another project

The install is user-wide, so steps 1–3 below only happen once per computer.
For each new project, all you do is:

1. Open the project in VS Code.
2. In the Claude chat, run `/vibe-wise:learn`.
3. Answer the setup questions. Notes are saved in that project's `.vibe-wise/` folder.
4. Optional: add `.vibe-wise/` to the project's `.gitignore`.

Check whether it's already installed: `claude plugin list` (look for `vibe-wise`).

---

## One-time setup on a new computer

### 1. Install Python 3 (the plugin's startup hook runs `python3`)

`winget` may not exist, so install from the Microsoft Store:

1. Open the **Microsoft Store**, search **Python 3.12** (publisher: Python Software
   Foundation), and click **Get**.
2. Close and reopen VS Code completely.
3. Check it in the terminal: `python3 --version` should print `Python 3.12.x`.

Use the Store version, not the python.org installer: only the Store version adds
the `python3` command on Windows.

**If `python3` is "not recognized":** the Store apps folder is missing from PATH.
Run this once in PowerShell, then fully restart VS Code:

```powershell
$add = Join-Path $env:LOCALAPPDATA 'Microsoft\WindowsApps'
$old = [Environment]::GetEnvironmentVariable('Path','User')
if (($old -split ';') -notcontains $add) {
  [Environment]::SetEnvironmentVariable('Path', $old.TrimEnd(';') + ';' + $add, 'User')
}
```

**If `python3` opens the Store instead of printing a version:** go to Windows Settings
→ Apps → Advanced app settings → App execution aliases, and turn on `python.exe` and
`python3.exe`.

### 2. Install the plugin (from a terminal, not the chat)

`/plugin` doesn't work in the VS Code extension chat, so use the VS Code terminal
(Ctrl+`):

```powershell
claude plugin marketplace add nykooi1/vibe-wise
claude plugin install vibe-wise@vibe-wise
```

`vibe-wise@anthropic-plugin-directory` may fail with "the Anthropic Directory isn't
available in this session". If so, use the GitHub commands above instead.

### 3. Reload and start

1. Reload VS Code: Ctrl+Shift+P → "Developer: Reload Window".
2. In the Claude chat, run `/vibe-wise:learn`.

---

## Everyday use

- `/vibe-wise:learn`: start or resume learning mode. It never resets your notes.
- To pause: tell Claude "pause learning mode".
- To reset a project's notes: run the plugin's reset skill. It previews first and
  keeps a backup.
- To update the plugin: `claude plugin marketplace update vibe-wise`, then reinstall
  or reload.
