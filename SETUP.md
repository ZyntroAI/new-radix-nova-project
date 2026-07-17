# Initial Setup & Configuration

This guide covers one-time setup tasks and environment configuration for the new-radix-nova-project.

## Before You Start

Ensure you've completed the [Installation Guide](./INSTALL.md) first.

## Environment Variables

Create a `.env.local` file in the project root (this file is not committed to version control):

```bash
# .env.local
# Add any environment variables your project needs
# Example:
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Public vs Private Variables

- **`NEXT_PUBLIC_*`**: Accessible in the browser (safe for non-sensitive data)
- **Other variables**: Only available on the server-side

## IDE Setup

### Visual Studio Code (Recommended)

1. Install the following extensions:
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
   - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

2. Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Git Configuration

### Pre-commit Hooks (Optional)

Add a pre-commit hook to lint and typecheck before commits:

```bash
# Install Husky
npm install husky --save-dev
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run typecheck"
```

### Commit Convention

Follow conventional commits:

```
feat: add new feature
fix: fix bug
docs: update documentation
refactor: refactor code
test: add tests
chore: update dependencies
```

## Running Tests

If tests are added later, run them with:

```bash
npm test
```

## Development Best Practices

### 1. Component Organization

```
components/
├── ui/              # Radix UI wrapped components
├── layout/          # Layout components
├── features/        # Feature-specific components
└── common/          # Shared components
```

### 2. Type Safety

Always define types for props:

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant, onClick, children }: ButtonProps) {
  // ...
}
```

### 3. Styling Guidelines

Use Tailwind CSS utility classes and follow the component-first approach:

```typescript
// ✅ Good
<div className="flex items-center gap-2 rounded-lg bg-gray-100 p-4">

// ❌ Avoid
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
```

## Building for Production

1. Run type checking and linting:

```bash
npm run typecheck
npm run lint
```

2. Build the project:

```bash
npm run build
```

3. Test the production build locally:

```bash
npm start
```

4. Verify at `http://localhost:3000`

## Deployment Preparation

### Environment Variables for Production

Set production environment variables in your deployment platform (Vercel, etc.):

1. Go to your deployment settings
2. Add environment variables under "Environment Variables"
3. Mark `NEXT_PUBLIC_*` as public if needed

### Performance Optimization

- Enable [Next.js Analytics](https://nextjs.org/analytics)
- Configure image optimization
- Enable [Vercel Web Analytics](https://vercel.com/analytics)

## Updating Dependencies

Check for outdated packages:

```bash
npm outdated
```

Update packages safely:

```bash
# Update patch versions (1.2.3 → 1.2.4)
npm update

# Update minor/major versions (interactive)
npm install -g npm-check-updates
ncu -i
```

After updating, test the application:

```bash
npm run build
npm start
```

## Troubleshooting Setup Issues

### Node version mismatch

Use Node Version Manager (nvm) to match the required version:

```bash
nvm install 18
nvm use 18
```

### Module resolution issues

Clear Next.js cache:

```bash
rm -rf .next
npm run dev
```

### Tailwind not working

Rebuild Tailwind CSS:

```bash
npm run build
```

## Next Steps

- Read the [INSTALL.md](./INSTALL.md) guide for development
- Review the project structure in the main [README.md](./README.md)
- Start building with [Next.js docs](https://nextjs.org/docs)
