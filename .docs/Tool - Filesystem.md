---
owner: ZyntroAI
---

[[แชทกับ Dola_1003.txt]]

Obsidian's approach to the filesystem is fundamentally different from most note-taking apps: it treats your notes as plain Markdown files in a regular folder on your device. This "local-first" architecture is the key to its flexibility, portability, and the entire ecosystem of tools built around it.

🗂️ Core Architecture: The Vault as a Folder

A vault is simply a folder on your local filesystem, including any subfolders, that Obsidian uses to store your notes as plain text Markdown files. Because they are standard files, you can use any other text editor or file manager to work with them, and Obsidian will automatically refresh to reflect external changes.

Alongside your notes, Obsidian creates a hidden .obsidian configuration folder in the vault's root. This folder stores all preferences specific to that vault, such as hotkeys, themes, and community plugins. Since most operating systems hide folders starting with a period (.), you may need to adjust your file manager's settings to see it.

Obsidian also maintains global settings in a system-specific location outside your vault. For performance, it uses a local IndexedDB database to store a metadata cache, which powers features like the Graph view and Outline view without needing to re-read every file constantly.

🛠️ The Developer API: Vault and DataAdapter

For plugin developers and advanced automation, Obsidian exposes two primary interfaces for filesystem operations.

The Vault Class is the primary, high-level interface for working with files and folders. It provides methods for creating, reading, modifying, and deleting files, as well as listening to file system events. Key methods include create(), read(), cachedRead() (optimized for display, not modification), modify(), delete(), getFileByPath(), and getAbstractFileByPath().

The DataAdapter Interface offers low-level access to the file system. It is implemented by platform-specific adapters: FileSystemAdapter for desktop and CapacitorAdapter for mobile (iOS/Android). Obsidian's own documentation recommends preferring the Vault API over DataAdapter when possible. DataAdapter methods include exists(), stat() (for metadata like creation and modification times), list(), read(), write(), append(), and their binary equivalents.

🤖 MCP Servers: AI Filesystem Access

A significant recent development is the emergence of Model Context Protocol (MCP) servers that give AI clients (like Claude, VS Code, or Cursor) controlled filesystem access to an Obsidian vault. These tools enable AI to read, search, and sometimes write to your notes without needing the Obsidian app to be running.

trsdn-obsidian-mcp is a focused, Python-based MCP server that runs over stdio. It is designed to be "local by design" with no HTTP server or API token required. It includes a read-only mode that can be enabled with a single environment variable to disable all write tools. Its available tools include vault_info, list_notes, list_folders, read_note, search_filename, search_content, write_note, append_note, move_note, and delete_note.

obsidian-filesystem-mcp is a Docker-based alternative that provides filesystem access over HTTP instead of stdio. It wraps the official @modelcontextprotocol/server-filesystem package with supergateway for HTTP transport, resulting in a production-ready, remotely-accessible server with zero custom code. It exposes a richer set of generic filesystem tools like read_text_file, read_multiple_files, read_media_file, write_file, edit_file, create_directory, move_file, list_directory, directory_tree, search_files, and get_file_info.

There are also other implementations like MCPVault (Windows-focused, C#/.NET 8, with SQLite FTS5 trigram search for Japanese and English) and markheramis/obsidian-mcp (filesystem-based MCP for Obsidian vaults).

🔌 File Management Plugins

While Obsidian's core File Explorer is a core plugin for basic browsing and file operations, several community plugins enhance filesystem management.

File Manager (jfsicilia/obsidian-file-manager) adds essential file management commands to the File Explorer, allowing keyboard-only workflows. Its features include Open With (using custom commands), Create Subfolder/Folder/Note, Duplicate, Move, Copy/Cut/Paste, Rename, Go to File/Folder, and a pathexplorer codeblock that can display files and folders from specified paths.

Column Explorer (n23eos/column_explorer) replaces Obsidian's file tree with a Finder-style Miller-columns file manager. It works as a full file manager with create, rename, move, delete, drag-and-drop, multi-select, context menus, folder colors, icons, and pinned/starred folders.

File System View displays an interactive, collapsible filesystem tree inside any Obsidian note, allowing you to browse and query your local file system beyond just your vault.

File Organizer 2000 and obsidian-file-organiser are AI-powered or rule-based plugins that automatically suggest file names, tags, and folders, or move notes into appropriate folders based on their names.

⚙️ CLI and Automation Tools

For power users who want to manage vaults from the command line, several tools exist.

obsidian-cli is a Go-based CLI for opening, searching, listing, and moving notes in your vault.

polish-cli is an AI-powered file organizer that converts all file types (PDFs, DOCs, images via OCR) into tagged Markdown documents for your Obsidian vault, while intelligently organizing the original files in a separate directory structure. It uses Claude AI for categorization and supports multiple processing modes including offline local mode.

maid is a file organiser CLI that sorts, converts, and routes files to Obsidian vaults, with undo support and document-to-markdown conversion.

Obsidian Vaults Manager (OVM) is a CLI for managing vaults, including syncing core, plugins, and custom files to specific vaults with flexible configuration.

💎 Best Practices

· Prefer the Vault API over DataAdapter when writing plugins, as it is higher-level and better maintained.
· Use cachedRead() for display-only operations and read() only when you intend to modify the file content afterward.
· Keep .obsidian out of Git for workspace.json and workspaces.json, as these files store the current workspace layout and update frequently.
· Don't create vaults within vaults, as internal links are local to a vault and may not update correctly.
· For MCP servers, enable read-only mode during initial setup and testing to prevent accidental writes to your vault.

If you'd like a deeper dive into a specific MCP server setup, the Vault API for plugin development, or a particular file management plugin, feel free to ask.