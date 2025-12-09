# Iris Chat - Setup Instructions

## Package Structure Created ✅

The iris-chat package has been successfully extracted with the following structure:

```
iris-chat/
├── package.json
├── tsconfig.json
├── README.md
├── .gitignore
└── src/
    ├── index.ts (main export file)
    ├── types.ts (TypeScript interfaces)
    └── components/
        ├── ChatDrawer.tsx
        ├── ChatPanel.tsx
        ├── GenericChatPanel.tsx
        └── PlatformPressable.tsx
```

## Next Steps

### 1. Install Dependencies (requires Node.js/npm)

```bash
cd /Users/jonaohana/Desktop/web-dev/iris-chat
npm install
```

### 2. Build the Package

```bash
npm run build
```

This will compile TypeScript files to the `dist/` folder.

### 3. Link to Everglee Project

```bash
# In everglee project
cd /Users/jonaohana/Desktop/web-dev/everglee
npm install ../iris-chat
```

### 4. Update Everglee Imports

Update the following files in your Everglee project:

**src/screens/TradeScreen.tsx** (and any other files using chat):
```tsx
// BEFORE:
import { ChatPanel } from '../components/ChatPanel';
import { GenericChatPanel } from '../components/GenericChatPanel';

// AFTER:
import { ChatPanel, GenericChatPanel } from 'iris-chat';
```

**src/components/MobileBottomNav.tsx** (if using ChatDrawer):
```tsx
// BEFORE:
import { ChatDrawer } from './ChatDrawer.native';

// AFTER:
import { ChatDrawer } from 'iris-chat';
```

### 5. Remove Old Chat Components from Everglee

Once you've verified iris-chat works, you can remove these files:
- `src/components/ChatPanel.tsx`
- `src/components/GenericChatPanel.tsx`
- `src/components/ChatDrawer.native.tsx`
- `src/components/PlatformPressable.tsx` (if not used elsewhere)

Update `src/types/index.ts` to remove `ChatMessage` interface (now in iris-chat).

## Publishing to npm (Optional)

If you want to publish this as a public package:

```bash
cd /Users/jonaohana/Desktop/web-dev/iris-chat
npm login
npm publish
```

Then in Everglee:
```bash
npm install iris-chat
```

## Git Repository

The iris-chat folder has been initialized as a git repository. To push to GitHub:

```bash
cd /Users/jonaohana/Desktop/web-dev/iris-chat
git add .
git commit -m "Initial commit: Iris Chat v1.0.0"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## What's Included

- ✅ All chat components extracted
- ✅ TypeScript configuration
- ✅ Type definitions
- ✅ Platform-agnostic code (web + native)
- ✅ Proper peer dependencies
- ✅ README with usage examples
- ✅ Git repository initialized

## Benefits

1. **Modularity**: Chat system is now completely separate
2. **Reusability**: Can be used in other projects
3. **Version control**: Independent versioning
4. **Cleaner codebase**: Everglee code is more focused
5. **NPM ready**: Can be published for public use

## Notes

- The package uses peer dependencies, so React Native and Expo icons must be installed in the parent project
- ChatDrawer uses `react-native-safe-area-context` which should already be in your Everglee project
- All styling is self-contained within the package
