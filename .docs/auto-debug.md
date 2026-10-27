https://www.perplexity.ai/search/0b4cbb91-5af2-4989-972b-893582f3b38f#1

Add error-checking steps to this skill

Add these **error-checking gates** to the skill. They make the agent verify for JavaScript errors, console warnings, failed plugin loads, and regressions before declaring a fix successful. Obsidian’s developer console exposes errors and stack traces, and the CLI provides `dev:errors` and `dev:console level=error` for automated checks.[1][2][3]

## Add to `SKILL.md`

Insert this section after **Debug workflow**:

```markdown
## Error-checking gates

Run these checks before changing anything, after each change, and before reporting success.

### 1. Baseline error check
Before applying a fix, establish what errors already exist:

```bash
obsidian dev:errors
obsidian dev:console level=error
```

Record:
- Error count
- Error messages
- Stack traces
- Plugin IDs or file names mentioned
- Whether errors are pre-existing or reproducible

If the Obsidian CLI is unavailable, open Developer Tools:
- Windows/Linux: `Ctrl+Shift+I`
- macOS: `Cmd+Option+I`

Then select **Console → Errors**, reproduce the issue, and save/export the red error messages. [11]

### 2. Reproduction check
Reproduce the user’s reported action while error capture is active.

Check for:
- New red errors
- Unhandled promise rejections
- Repeated errors
- Errors that occur only after a specific command, note open, plugin action, or settings change

If no error appears, do not assume the issue is fixed; check warnings, network failures, plugin settings, and the exact user workflow.

### 3. Plugin-load check
Verify that the affected plugin actually loaded:

```bash
obsidian dev:console level=error
```

Look for messages such as:
- `Failed to load plugin`
- `Plugin failed to load`
- `Cannot find module`
- `manifest.json`
- `main.js`
- `TypeError`
- `ReferenceError`
- `Unhandled rejection`

If inspecting the app directly, confirm that the plugin appears in both the installed-plugin manifests and loaded-plugin registry. A plugin can be enabled in settings but still fail during initialization. [22]

### 4. Build and file checks
For a plugin under development, verify:

```bash
npm run build
```

or the project’s equivalent build command.

Confirm:
- The build completes without errors
- `main.js` was regenerated after the latest source change
- `manifest.json` has a valid plugin ID, version, and entry point
- The plugin is enabled in `.obsidian/community-plugins.json`
- The plugin folder contains the expected `main.js`, `manifest.json`, and, when required, `styles.css`

The developer console commonly reveals JavaScript errors, stack traces, plugin log output, and network problems; checking the build and confirming that `main.js` updated are standard validation steps. [16]

### 5. Conflict isolation check
If errors persist or their source is unclear:

1. Disable nonessential community plugins.
2. Restart or reload Obsidian.
3. Re-run:
   ```bash
   obsidian dev:errors
   obsidian dev:console level=error
   ```
4. Re-enable plugins in small batches.
5. Re-run the checks after each batch.

If errors remain with all community plugins disabled, investigate core plugins, themes, CSS snippets, vault permissions, or the Obsidian installation itself. [24]

### 6. Post-fix regression check
After applying a fix:

```bash
obsidian plugin:reload id=<plugin-id>
sleep 3
obsidian dev:errors
obsidian dev:console level=error
```

Pass only if:
- The original user action succeeds
- No new errors appear
- The prior error count does not increase
- No unhandled promise rejection appears
- The affected plugin reloads successfully
- Any changed file was backed up and remains valid

A useful pattern is to clear the console, reload the plugin, wait briefly, then inspect the captured console output for errors or unexpected load messages. [15]

### 7. Failure policy
Stop and report instead of guessing when:
- The same error returns after two targeted fixes
- A fix requires deleting user data or plugin data
- The error involves authentication, sync conflicts, or potentially corrupted notes
- The CLI/console is unavailable and the issue cannot be reproduced safely

In the report, distinguish clearly between:
- **Fixed**: original action works and no new errors appear
- **Improved**: error count or severity decreased, but an error remains
- **Unresolved**: root cause is still unknown; include collected evidence and the safest next diagnostic step
```

## Replace the verification step

Also replace the original **5. Verify** item with:

```markdown
5. **Verify using error-checking gates**
   - Run the baseline, reproduction, plugin-load, and post-fix regression checks.
   - Reload the affected plugin or restart Obsidian.
   - Re-run `obsidian dev:errors` and `obsidian dev:console level=error`.
   - Confirm the user’s original action works and that no new errors or unhandled rejections appear.
   - Mark the result as **Fixed**, **Improved**, or **Unresolved**.
```

## Minimal automated loop

For plugin debugging, use this check-after-change loop:

```bash
obsidian dev:debug on
obsidian dev:console clear
obsidian plugin:reload id=your-plugin-id
sleep 3
obsidian dev:errors
obsidian dev:console level=error
```

The `dev:debug on` step matters because `dev:console` may capture nothing until the debugger is attached; clearing the console before reload makes new errors easy to distinguish from old ones.[2]

การอ้างอิง:
[1] Help and support https://obsidian.md/help/resources
[2] obsidian-gemini/docs/contributing/testing.md at master - GitHub https://github.com/allenhutchison/obsidian-gemini/blob/master/docs/contributing/testing.md
[3] Obsidian Official CLI Skill - ClawHub https://clawhub.ai/slmoloch/skills/obsidian-official-cli
[4] Linear - Obsidian Plugin https://community.obsidian.md/plugins/linear
[5] Logcollector - Obsidian Plugin https://community.obsidian.md/plugins/logcollector
[6] vConsole - Obsidian Plugin https://community.obsidian.md/plugins/vconsole
[7] Development Workflow | obsidianmd/obsidian-plugin-docs | DeepWiki https://deepwiki.com/obsidianmd/obsidian-plugin-docs/2.3-development-workflow
[8] antigravity-to-world/skills/obsidian-cli/SKILL.md at main - GitHub https://github.com/oki3505F/antigravity-to-world/blob/main/skills/obsidian-cli/SKILL.md
[9] Obsidian plugins with #debugging - 4 plugins https://www.obsidianstats.com/tags/debugging
[10] Troubleshooting | brianpetro/smart-chatgpt-obsidian | DeepWiki https://deepwiki.com/brianpetro/smart-chatgpt-obsidian/9-troubleshooting
[11] clawhub.ai › alexanderkinging › skillsObsidian Official CLI — ClawHub https://clawhub.ai/alexanderkinging/skills/obsidian-cli-official
[12] obsidian-incident-runbook - Skill - Smithery https://smithery.ai/skills/jeremylongshore/obsidian-incident-runbook
[13] Development Guide | RyotaUshio/obsidian-pdf-plus | DeepWiki https://deepwiki.com/RyotaUshio/obsidian-pdf-plus/9-development-guide
[14] Errors Seen in the Developer Console ALT+CMD+i - Help https://forum.obsidian.md/t/errors-seen-in-the-developer-console-alt-cmd-i/38253
