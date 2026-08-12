> ## Documentation Index
> Fetch the complete documentation index at: https://docs.base44.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Base44 MCP server

> Create and manage Base44 backend projects from AI assistants like ChatGPT, Claude, and Cursor

The Base44 MCP server exposes your Base44 account to any MCP-compatible AI assistant. Once connected, you can describe what you want to build or change and the AI will create or update projects on your behalf.

To connect, you must authenticate with OAuth. During that flow you choose which workspace to grant access to, and Base44 only acts within that workspace, with your explicit permission.

<Warning>
  You need a [**Builder plan**](https://base44.com/pricing) or higher to connect an AI assistant through the Base44 MCP server.
</Warning>

## Connect your AI assistant

The server is available at:

```text theme={null}
https://app.base44.com/mcp
```

Add it to your AI tool's MCP configuration:

```json theme={null}
"base44": {
  "type": "http",
  "url": "https://app.base44.com/mcp"
}
```

After adding the configuration, your AI tool will prompt you to sign in to Base44 through the standard OAuth flow. You only need to do this once.

<Tip>
  Some tools require a restart to pick up new MCP configurations.
</Tip>

### Choose a workspace

During the OAuth consent step, you choose which workspace the connection targets. Previously every connection defaulted to your personal workspace. Now you can point an assistant at a team's shared workspace instead.

Every action the assistant takes, including creating, listing, and editing projects, runs in the workspace you pick, and the connection cannot reach any other workspace. The workspace is fixed for the life of the connection. To target a different workspace, connect again and select it during consent.

### What your assistant can do in a workspace

Your assistant acts as you, so it inherits your role in the selected workspace. What it can do follows the same rules that apply to you in the Base44 editor.

* **Creating projects:** You need create permission in the workspace. In a shared workspace, a Viewer or Guest cannot create projects.
* **Editing projects:** You need write access to the project. A read-only Viewer cannot make changes, even to a project they can open.
* **Reading projects:** Listing projects, reading entity schemas, and querying records follow the same read access you already have.

### SSO-enforced workspaces

Base44 re-checks your workspace membership on every request and every token refresh, so a connection only keeps working while your access does.

If the selected workspace enforces SSO, that check is stricter. Removing you from the workspace ends the connection right away, and rotating the workspace's SSO configuration ends it until you connect again.

## Available tools

The server exposes the following tools to your AI assistant.

| Tool                  | What it does                                    |
| --------------------- | ----------------------------------------------- |
| `create_base44_app`   | Create a new project from a text description    |
| `edit_base44_app`     | Make changes to an existing project             |
| `list_user_apps`      | List your projects, optionally filtered by name |
| `list_entity_schemas` | Get the entity schemas for a project            |
| `query_entities`      | Query records from an entity in a project       |

<AccordionGroup>
  <Accordion title="Internal tools">
    Two additional tools are used internally by specific MCP clients to poll build progress. They are not intended to be called directly.

    | Tool                  | What it does                                               |
    | --------------------- | ---------------------------------------------------------- |
    | `get_app_status`      | Check whether a project build is complete                  |
    | `get_app_preview_url` | Get the preview link for a project once its build is ready |
  </Accordion>
</AccordionGroup>

## Example prompts

Once connected, you can ask your AI assistant things like:

* "Create a Base44 project for tracking job applications with status, company name, and interview notes."
* "Edit my CRM project to add a follow-up date field to the Contacts entity."
* "List all my Base44 projects."
* "Add 10 sample products to my inventory project so I can test the UI."
* "Query the first 10 orders from my e-commerce project that have status pending."

The AI interprets your request and calls the appropriate tool. For `create_base44_app` and `edit_base44_app`, the build runs in the background and you get a link to the Base44 editor when it's ready.

## See also

* [Docs MCP server](/developers/backend/overview/base44-docs-mcp): Let AI assistants search Base44 documentation directly
* [App MCP server](/Integrations/app-mcp): Let AI assistants connect to and use an app you built
* [Skills](/developers/backend/overview/skills): Reusable instructions that teach AI coding agents how to perform Base44-specific tasks
* [Entities](/developers/backend/resources/entities/overview): Learn about the data model that `list_entity_schemas` and `query_entities` operate on
