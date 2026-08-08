# new-radix-nova-project

A modern Next.js project bootstrapped with [v0](https://v0.app), featuring Radix UI components, Tailwind CSS styling, and TypeScript for type safety.

## Quick Links

- **🚀 [Installation Guide](./INSTALL.md)** - Get up and running in minutes
- **⚙️ [Setup Guide](./SETUP.md)** - Configure your development environment
- **🔗 [Continue on v0](https://v0.app/chat/projects/prj_Xx8jZ4X8FSlcobnA0R0kx48ruvBo)** - Edit components with AI assistance

## Getting Started

### Prerequisites

- **Node.js** v18.17.0 or later
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
git clone https://github.com/ZyntroAI/new-radix-nova-project.git
cd new-radix-nova-project
npm install
```

### Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Commands

```bash
npm run dev        # Start development server with Turbopack
npm run build      # Build for production
npm start          # Run production build
npm run lint       # Run ESLint
npm run format     # Format with Prettier
npm run typecheck  # TypeScript type checking
```

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org) | React framework with SSR/SSG |
| [React 19](https://react.dev) | UI library |
| [Radix UI](https://www.radix-ui.com/) | Headless UI components |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [shadcn/ui](https://ui.shadcn.com/) | Pre-built Radix components |
| [Recharts](https://recharts.org/) | Data visualization |
| [Lucide React](https://lucide.dev/) | Icon library |

## Project Structure

```
new-radix-nova-project/
├── app/                     # Next.js app directory
│   ├── page.tsx            # Home page
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── ui/                 # Radix UI wrapped components
│   └── ...                 # Feature components
├── lib/                    # Utilities and helpers
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── INSTALL.md              # Installation guide
├── SETUP.md                # Configuration guide
└── README.md               # This file
```

## Development Workflow

1. **Edit pages** in `app/` - changes hot-reload automatically
2. **Create components** in `components/` and import them
3. **Style with Tailwind** - use utility classes
4. **Type safely** with TypeScript
5. **Run checks** before committing:
   ```bash
   npm run typecheck && npm run lint && npm run format
   ```

## Built with v0

This repository is linked to a v0 project. You can use AI-assisted development:

- Visit [the v0 project](https://v0.app/chat/projects/prj_Xx8jZ4X8FSlcobnA0R0kx48ruvBo)
- Start new chats to make changes
- v0 will push commits directly to this repository

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel. Deploy in one click:

1. Push to GitHub
2. Connect your repository to Vercel
3. Vercel automatically deploys on push

For detailed instructions, see [INSTALL.md](./INSTALL.md#build--deploy).

## Philosophy

This project follows principles inspired by [OpenClaw's Vision](https://github.com/openclaw/openclaw/blob/7a589567681bd814497059cc920f9cdb71cb41a4/VISION.md):

- **Transparent Setup** - Clear prerequisites and installation steps
- **Explicit Configuration** - Setup is visible and configurable
- **Type Safety** - Full TypeScript for reliable code
- **Best Practices** - ESLint, Prettier, and type checking built-in
- **Developer Experience** - Fast iteration with Turbopack and hot reload

## Documentation

- [Installation Guide](./INSTALL.md) - Step-by-step setup instructions
- [Setup Guide](./SETUP.md) - Configuration and environment setup
- [Next.js Documentation](https://nextjs.org/docs) - Framework reference
- [Radix UI Documentation](https://www.radix-ui.com/docs) - Component library
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling framework
- [v0 Documentation](https://v0.app/docs) - AI-assisted development

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Dependencies not installing:**
```bash
npm cache clean --force && rm -rf node_modules && npm install
```

**TypeScript errors:**
```bash
npm run typecheck
```

For more troubleshooting, see [INSTALL.md](./INSTALL.md#troubleshooting).

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run checks: `npm run typecheck && npm run lint && npm run format`
4. Submit a pull request

## License

See LICENSE file for details.

---

**Need help?** Check the [Installation](./INSTALL.md) or [Setup](./SETUP.md) guides, or review the documentation links above.
