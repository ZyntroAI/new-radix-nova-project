# Installation Guide

This document explains how to set up and run the new-radix-nova-project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.17.0 or later) - [Download](https://nodejs.org/)
- **npm** (v9+), **yarn** (v3+), or **pnpm** (v8+)

Verify your installation:

```bash
node --version
npm --version
```

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ZyntroAI/new-radix-nova-project.git
cd new-radix-nova-project
```

### 2. Install Dependencies

Choose your package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Start Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at **[http://localhost:3000](http://localhost:3000)**.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint checks |
| `npm run format` | Format code with Prettier |
| `npm run typecheck` | Check TypeScript types |

## Project Structure

```
new-radix-nova-project/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Main page
│   └── layout.tsx      # Root layout
├── components/         # React components
├── lib/               # Utility functions
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.ts # Tailwind CSS config
└── next.config.ts     # Next.js configuration
```

## Technology Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS 4.1.18](https://tailwindcss.com/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **React Version**: ^19.2.4

## Development Workflow

### Edit Pages

Edit `app/page.tsx` to modify the home page. Changes are reflected automatically due to Next.js hot reload.

### Add Components

Create new components in the `components/` directory and import them into your pages.

### Style with Tailwind

This project uses Tailwind CSS with Radix UI components. Use Tailwind utility classes for styling.

### Type Safety

TypeScript is configured for full type checking. Run `npm run typecheck` to verify.

### Code Quality

- **Linting**: ESLint is configured to catch common issues
- **Formatting**: Prettier ensures consistent code style

Run before committing:

```bash
npm run typecheck
npm run lint
npm run format
```

## Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel

This project is optimized for [Vercel](https://vercel.com/). Push to your repository and follow Vercel's deployment instructions.

## Connected to v0

This repository is linked to a [v0 project](https://v0.app). You can continue developing by visiting:

[Continue working on v0 →](https://v0.app/chat/projects/prj_Xx8jZ4X8FSlcobnA0R0kx48ruvBo)

v0 will push commits directly to this repository when you make changes there.

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, specify a different port:

```bash
npm run dev -- -p 3001
```

### Dependencies Installation Issues

Clear cache and reinstall:

```bash
# Using npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Using pnpm
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

Ensure TypeScript is up to date and check for type errors:

```bash
npm run typecheck
```

## Next Steps

1. Review the [Next.js Documentation](https://nextjs.org/docs)
2. Explore [Radix UI Components](https://www.radix-ui.com/)
3. Learn [Tailwind CSS](https://tailwindcss.com/docs)
4. Check out [v0 Documentation](https://v0.app/docs)

## Contributing

Refer to the project's contribution guidelines before submitting pull requests.

## License

See LICENSE file for details.
