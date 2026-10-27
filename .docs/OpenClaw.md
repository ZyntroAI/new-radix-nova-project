To install OpenClaw, you need Node.js 24.16+ or 26.1+ (Node 26 is recommended) and then run the installer for your system (for macOS/Linux: curl -fsSL https://openclaw.ai/install.sh | bash; for Windows PowerShell: iwr -useb https://openclaw.ai/install.ps1 | iex). After that, the onboarding wizard sets up your config, then you install the background Gateway with openclaw gateway install and verify it with openclaw gateway status.

OpenClaw presents significant security risks, including exposure to malicious skills and the potential for system-wide impacts due to its extensive permissions. To set it up safely, it is recommended to run OpenClaw in a secure environment, such as a virtual machine or a separate physical system, and avoid connecting it to the internet to minimize exposure.

**OpenClaw** is an open-source game engine and framework designed for creating and running games based on the original *Claw* game (a 1997 action-adventure game developed by Monolith Productions). The project aims to reimplement or reverse-engineer the game's mechanics, assets, and engine to allow for modern modifications, ports, or even a full re-release.

### Key Features of OpenCLAW:
1. **Game Engine Recreation**:
   - Reverse-engineers the original *Claw* game's engine (likely based on a modified version of the *Build Engine*, which powered games like *Duke Nukem 3D*).
   - Supports loading original game assets (levels, sprites, sounds, etc.) or new custom content.

2. **Cross-Platform Support**:
   - Designed to work on modern operating systems (Windows, Linux, macOS) and potentially other platforms (e.g., retro consoles via emulation).

3. **Modding Support**:
   - Allows for community-driven modifications, including new levels, weapons, enemies, and gameplay tweaks.
   - May include tools for editing game data (e.g., level editors, sprite converters).

4. **Open-Source License**:
   - Typically released under licenses like GPL or MIT, enabling free use and contributions.

5. **Compatibility**:
   - Can run original *Claw* game data files (e.g., `.GRP` archives) or new content created by the community.

### Current Status:
- OpenClaw is a community-driven project, and its development progress varies. Some versions may be playable with original assets, while others might focus on engine improvements.
- Check the official repository (e.g., on GitHub) for the latest updates, documentation, and download links.

### How to Get OpenClaw:
1. **GitHub**: Search for "OpenClaw" on GitHub to find the official repository.
2. **Dependencies**: Ensure you have the original *Claw* game files (if required) or compatible assets.
3. **Build Instructions**: Follow the project's README for compilation or installation steps.

### Example Use Case:
If you own the original *Claw* game, you could use OpenClaw to:
- Play the game on modern systems.
- Modify levels or gameplay mechanics.
- Create new content for the community.

For more details, visit the project's repository or forums (e.g., [OpenClaw GitHub](https://github.com/OpenClaw)).

## What OpenClaw Is

**OpenClaw is an open-source AI assistant platform** that runs on your own devices—macOS, Linux, Windows, iOS, and Android—and integrates with 20+ messaging platforms and native apps. <citation src="1"></citation> Created by **Peter Steinberger and the community**, it grew from a weekend project to become one of the most-starred software repositories on GitHub with over 346,000 stars in under five months. <citation src="2"></citation>

## Key Features & Architecture

OpenClaw works as a **local AI gateway** that meets you where you already chat: Discord, iMessage, Slack, Teams, Telegram, WhatsApp, and more, plus native applications. <citation src="1"></citation> The defining characteristic is privacy and control—**your state, memory, and credentials live entirely on your hardware**. <citation src="1"></citation>

### How It Works

The system uses a **trusted gateway with untrusted execution** model. Models and agent harnesses (Claude, Codex, local models) are pluggable components you can swap without changing anything else. <citation src="1"></citation> Your prompts go only to the model providers and chat platforms you configure; by default, OpenClaw itself doesn't phone home except for daily version checks, and anonymous feature statistics are opt-in. <citation src="1"></citation>

## Core Capabilities

OpenClaw agents come equipped with built-in tools including:

- **Runtime execution**: Run commands, manage processes, execute code
- **File system access**: Read, write, edit workspace files
- **Browser automation**: Full browser sessions for interaction and content extraction
- **Web tools**: Web search (fast, no JavaScript rendering), web fetching, X/Twitter search
- **Vision**: Image analysis and generation
- **Media**: Video generation, text-to-speech <citation src="3"></citation>

Beyond built-in tools, you can extend OpenClaw through **plugins** that add new capabilities like integrations with GitHub, Cal.com, email, CRM systems, and more. These are installed from ClawHub (the community marketplace), npm, git, or local directories. <citation src="3"></citation>

## Governance & Licensing

**OpenClaw is stewarded by the OpenClaw Foundation**, an independent 501(c)(3) nonprofit with no paid tier, hosted service, or token requirements. <citation src="1"></citation> It's licensed under the **MIT License**. <citation src="1"></citation> The Foundation is supported by donors including Amazon, OpenAI, Red Hat, and the University of Michigan, with infrastructure backing from GitHub, NVIDIA, and Vercel. <citation src="1"></citation>

## Installation & Use

Installation is straightforward for macOS/Linux/WSL2 via a single curl command, or Windows via PowerShell. Once installed, you onboard with `openclaw onboard --install-daemon`, then access the dashboard and start chatting. <citation src="1"></citation>

---

**Is there a specific aspect of OpenClaw you'd like to explore further**—like setting up plugins, connecting to specific messaging platforms, or understanding the security model?

I'll cover all three areas in depth—each is important for getting OpenClaw production-ready.

---

## Setting Up Plugins

**Plugins are what give OpenClaw its capabilities.** They're installed from three sources: ClawHub (the community marketplace), npm, or git/local paths. <citation src="1,3"></citation>

### Installation Process

The easiest way to find and install plugins is through **OpenClaw's built-in search**:

```bash
openclaw plugins search "calendar"
```

Then install with:

```bash
openclaw plugins install clawhub:<package>
```

For updated builds (after 2026.10.4), you can omit the `clawhub:` prefix. <citation src="3"></citation> From npm directly, use:

```bash
openclaw plugins install npm:<package>
```

Update all plugins at once:

```bash
openclaw plugins update --all
```

### Plugin Capability Review

When installing third-party plugins, **OpenClaw requires you to review and accept their declared capabilities** before enabling them. <citation src="5"></citation> This consent screen shows:

- **Channels** the plugin connects to (Discord, Slack, etc.)
- **Tools** it can use (file operations, API calls, shell commands)
- **MCP servers** and backends it runs
- **Dangerous configuration flags** it might need

Bundled plugins and verified official OpenClaw plugins skip this step. <citation src="5"></citation> For non-interactive setups (CI/CD pipelines), use the `--accept-capabilities` flag to approve automatically:

```bash
openclaw plugins install <package> --accept-capabilities
```

### Managing & Inspecting Plugins

Use the **Control UI** (the web dashboard) to view installed plugins, enable/disable them, and configure settings. For the CLI, view all installed plugins:

```bash
openclaw plugins list
```

Inspect a specific plugin's runtime registrations:

```bash
openclaw plugins inspect <plugin-id> --runtime --json
```

---

## Connecting to Messaging Platforms

**OpenClaw supports 29 messaging channels.** <citation src="6"></citation> The right choice depends on your use case, privacy requirements, and setup complexity.

### Quick Comparison

Here's how the major platforms stack up: <citation src="7"></citation>

| Platform | Setup Time | Best For | Key Features |
|----------|-----------|----------|--------------|
| **Telegram** | 3 minutes | Solo users, first install | Official API, no public IP needed, most stable |
| **Discord** | 10 minutes | Power users, communities | Threads, buttons, role-based access |
| **Slack** | 15 minutes | Teams already on Slack | Thread-aware, integrates with business workflows |
| **Signal** | 20 minutes | Privacy-first deployments | End-to-end encryption, but requires signal-cli |
| **WhatsApp** | 5 minutes | Mobile-first users | Works, but uses unofficial library (less stable) |

### Telegram Setup (Recommended for Most Users)

**Telegram wins for most people** because it's the simplest: no public IP needed, official Bot API, and five-minute setup. <citation src="7"></citation>

1. Create a bot with **@BotFather** on Telegram
2. Get your bot token (looks like `1234567890:ABCdefGHIjklmnoPQRstUVwxyz`)
3. Configure in OpenClaw:
   ```bash
   openclaw config set channels.telegram.token "YOUR_TOKEN_HERE"
   ```

### Discord Setup (For Power Users)

Discord requires **two tokens**: an **App Token** (`xapp-`) for Socket Mode and a **Bot Token** (`xoxb-`) for interactions. <citation src="7"></citation> You also need to subscribe to specific bot events in your Discord app configuration—missing events means messages won't arrive.

**Critical gotcha**: Every time you change Discord app permissions, click **"Reinstall to Workspace"** in the Discord Developer Portal. If you skip this, changes don't take effect. <citation src="7"></citation>

Full setup requires:
- Creating an app in Discord Developer Portal
- Enabling Socket Mode
- Subscribing to message and interaction events
- Configuring bot permissions (least privilege recommended)

### Slack Setup (For Teams)

Slack is the most configuration-heavy but worth it if your team already uses it. Like Discord, you need two tokens and must subscribe to bot events. <citation src="7"></citation>

**You can run multiple platforms simultaneously** from a single OpenClaw instance—each with its own configuration. <citation src="10"></citation>

---

## Understanding the Security Model

**This is critical.** OpenClaw's security model is fundamentally different from a chatbot because **it executes actions with real permissions**. <citation src="11,14"></citation>

### Core Security Assumptions

OpenClaw assumes: <citation src="12"></citation>

- **Single trusted operator per instance** — It's not designed as a multi-tenant system
- **The host OS is trusted** — Anyone who can modify environment variables or `~/.openclaw` config is effectively a trusted operator
- **No multi-user boundaries within one gateway** — Multiple people accessing the same agent can all steer it within its granted permissions
- **Session IDs are routing controls, not authorization boundaries** — They don't isolate users from each other

**Do not share a single OpenClaw gateway between mutually untrusted people.** Use separate gateways (or separate OS users/hosts) per trust boundary. <citation src="12"></citation>

### The Central Risk: Prompt Injection

Unlike chatbots, OpenClaw **reads and acts on external content**: emails, webpages, Slack messages, documents, forum posts. Attackers can embed malicious instructions in that content, and the agent will execute them without knowing it's been compromised. <citation src="13,15"></citation>

**Example attack**: An attacker posts instructions in a Discord channel monitored by an OpenClaw bot. The bot reads the message, executes the embedded commands (like "forward sensitive conversations to my email"), and the attack appears as normal bot behavior. <citation src="13"></citation>

This is called **indirect prompt injection**—far more dangerous than direct prompts because it collapses the boundary between data and instructions. <citation src="13"></citation>

### Tool Access Risk

OpenClaw inherits the user's permissions and can access: <citation src="14"></citation>

- **Shell commands** with the user's privileges
- **Files and credentials** stored on disk
- **APIs and SaaS** with connected tokens
- **Calendars, browsers, email** with read/write access

If **exposed to the internet without proper hardening, the gateway becomes an always-on access path** for attackers. <citation src="14"></citation> There are already **30,000+ exposed OpenClaw instances** in the wild. <citation src="15"></citation>

### Skill Supply Chain Risk

Skills are text files (`SKILL.md`) + supporting code installed into the agent's context. **They execute with zero sandboxing in the same process as the operator.** <citation src="12"></citation> Skills from ClawHub are not cryptographically signed—they're downloaded and used directly. A malicious skill can instruct the LLM to steal credentials or run arbitrary commands.

Real-world example: A **malicious "yahoofinance" skill** was published to ClawHub. Its `SKILL.md` instructed users to download and run a "dependency" from an attacker-controlled URL, which installed a trojan. <citation src="12"></citation>

**ClawHub now scans all published skills with VirusTotal** to detect malware, but this is a defense-in-depth measure, not a guarantee. <citation src="15"></citation>

### Defense-in-Depth Strategies

**Best practices** to harden OpenClaw: <citation src="15"></citation>

1. **Run on a dedicated machine** — Isolate OpenClaw from personal data and critical systems
2. **Use least-privilege tool policy** — Don't enable shell access or file write if you don't need it
3. **Sandbox execution** — Run in a container or VM if handling untrusted content
4. **Monitor behavior** — Watch for anomalous tool calls or file access
5. **Restrict gateway access** — Never expose the gateway to the internet without authentication
6. **Validate skill sources** — Review ClawHub scan results; prefer official plugins
7. **Use strong models** — Weak model tiers are easier to prompt-inject; prefer Claude, GPT-4
8. **Implement exec approvals** — Require human confirmation before sensitive actions execute

---

**The bottom line**: OpenClaw is designed as a **personal assistant, not enterprise middleware**. It's extremely useful when deployed carefully, but treating it as a chatbot will get you compromised. Treat it as a privileged identity with system access—because that's what it is.