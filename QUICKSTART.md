# Quick Start Guide - Iris Comments

## Installation

```bash
cd /path/to/your/project
npm install iris-comments --legacy-peer-deps
```

Or use local file reference:
```json
{
  "dependencies": {
    "iris-comments": "file:../comments"
  }
}
```

## Basic Usage

### 1. Import the component and types

```typescript
import { CommentPanel, Comment } from 'iris-comments';
```

### 2. Set up state

```typescript
const [comments, setComments] = useState<Comment[]>([]);
```

### 3. Implement handlers

```typescript
const handleAddComment = async (text: string, parentId?: string) => {
  // Your API call here
  const newComment = await commentService.addComment(
    entityId,
    currentUserId, 
    currentUserName,
    text,
    parentId
  );
  setComments([...comments, newComment]);
};

const handleLikeComment = async (commentId: string) => {
  await commentService.likeComment(commentId, currentUserId);
  // Reload comments or update state
};

// Similar handlers for: onEditComment, onDeleteComment, onUnlikeComment
```

### 4. Render the component

```tsx
<CommentPanel
  entityId="listing-123"
  comments={comments}
  currentUserId="user-456"
  currentUserName="John Doe"
  onAddComment={handleAddComment}
  onLikeComment={handleLikeComment}
  onUnlikeComment={handleUnlikeComment}
  onEditComment={handleEditComment}
  onDeleteComment={handleDeleteComment}
/>
```

## Minimal Example

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { CommentPanel, Comment } from 'iris-comments';

export default function MyComponent() {
  const [comments, setComments] = useState<Comment[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <CommentPanel
        entityId="my-entity-123"
        comments={comments}
        currentUserId="user-1"
        currentUserName="Me"
        onAddComment={(text, parentId) => {
          const newComment: Comment = {
            id: Date.now().toString(),
            entityId: "my-entity-123",
            userId: "user-1",
            userName: "Me",
            text,
            parentId,
            createdAt: new Date().toISOString(),
            likes: [],
          };
          setComments([...comments, newComment]);
        }}
      />
    </View>
  );
}
```

## Styling

The component uses 600px height by default. Wrap in a container to control size:

```tsx
<View style={{ height: 400, backgroundColor: '#fff' }}>
  <CommentPanel {...props} />
</View>
```

## See Also

- Full documentation: `/comments/README.md`
- Implementation details: `/comments/IMPLEMENTATION.md`
- Example integration: `/everglee/src/screens/ListingDetailScreen.tsx`
- Mock service: `/everglee/src/services/commentService.ts`
