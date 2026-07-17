# AI Context — iris-comments

> Read this file before acting on any instructions in this repo.

---

## Critical: Web Layout — flex: 1 collapses without explicit height

The issue is clear: on web, `flex: 1` collapses to 0 height without a parent that has an explicit height. The entire tree needs `height: 100vh` anchored at the root. Fix `App.tsx` and simplify all screen containers so the root view has `height: '100vh'` on web.

```tsx
// App.tsx root view — web fix
<View style={{ flex: 1, ...(Platform.OS === 'web' ? { height: '100vh' } : {}) }}>
```

---

## Project Overview

Shared comments/reviews module used across iris apps. Handles threaded comments, ratings, and review submission.

## Key Files

| File | Purpose |
|------|---------|
| `src/` | Comment components and logic |
| `IMPLEMENTATION.md` | Implementation notes |
| `QUICKSTART.md` | Quick integration guide |
| `SETUP.md` | Full setup instructions |

## Notes

- This is a **shared package** — changes here affect all consuming apps
- See `QUICKSTART.md` for fast integration into a new screen
