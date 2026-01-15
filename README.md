# Iris Comments

A beautiful, cross-platform comments component library for React Native and React Native Web.

## Features

- 🌐 **Cross-platform**: Works seamlessly on iOS, Android, and Web
- 💬 **Rich commenting**: Nested replies, reactions, and threaded discussions
- 🎨 **Customizable**: Clean, modern UI with iOS-inspired design
- 📱 **Responsive**: Adapts to different screen sizes and platforms
- ⚡ **Lightweight**: Minimal dependencies
- ⏱️ **Real-time**: Support for live comment updates
- 👤 **User-friendly**: Like/unlike, edit, delete functionality
- 🔄 **Threaded Replies**: Support for nested comment threads
- ✨ **Sorting Options**: Sort by newest, oldest, or most popular

## Installation

```bash
npm install iris-comments
```

### Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-native @expo/vector-icons react-native-safe-area-context
```

## Components

### CommentPanel

The main component for displaying and managing comments on any entity (listing, post, article, etc.).

```tsx
import { CommentPanel, Comment } from 'iris-comments';
import { commentService } from './services/commentService';

const [comments, setComments] = useState<Comment[]>([]);

const handleAddComment = async (text: string, parentId?: string) => {
  const newComment = await commentService.addComment(
    entityId,
    currentUserId,
    currentUserName,
    text,
    parentId
  );
  setComments([...comments, newComment]);
};

<CommentPanel
  entityId="listing-123"
  comments={comments}
  currentUserId="user-456"
  currentUserName="John Doe"
  onAddComment={handleAddComment}
  onEditComment={handleEditComment}
  onDeleteComment={handleDeleteComment}
  onLikeComment={handleLikeComment}
  onUnlikeComment={handleUnlikeComment}
  placeholder="Write a comment..."
  title="Comments"
  showHeader={true}
  enableLikes={true}
  enableEditing={true}
  enableDeleting={true}
  enableReplies={true}
  maxNestingLevel={3}
/>
```

### Comment Type

```typescript
interface Comment {
  id: string;
  entityId: string; // ID of the entity being commented on
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string; // For nested replies
  likes: string[]; // Array of user IDs who liked this comment
  isEdited?: boolean;
}
```

## Props

### CommentPanel Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `entityId` | string | Yes | - | ID of the entity being commented on |
| `comments` | Comment[] | Yes | - | Array of comments to display |
| `currentUserId` | string | Yes | - | ID of the current user |
| `currentUserName` | string | Yes | - | Name of the current user |
| `currentUserAvatar` | string | No | - | Avatar URL of the current user |
| `onAddComment` | (text: string, parentId?: string) => void | Yes | - | Callback when adding a comment |
| `onEditComment` | (commentId: string, text: string) => void | No | - | Callback when editing a comment |
| `onDeleteComment` | (commentId: string) => void | No | - | Callback when deleting a comment |
| `onLikeComment` | (commentId: string) => void | No | - | Callback when liking a comment |
| `onUnlikeComment` | (commentId: string) => void | No | - | Callback when unliking a comment |
| `placeholder` | string | No | "Write a comment..." | Placeholder text for comment input |
| `title` | string | No | "Comments" | Title displayed in header |
| `showHeader` | boolean | No | true | Whether to show the header |
| `maxNestingLevel` | number | No | 3 | Maximum nesting level for replies |
| `enableLikes` | boolean | No | true | Enable like/unlike functionality |
| `enableEditing` | boolean | No | true | Enable comment editing |
| `enableDeleting` | boolean | No | true | Enable comment deletion |
| `enableReplies` | boolean | No | true | Enable nested replies |

## Example Integration

See the full example in `/everglee/src/screens/ListingDetailScreen.tsx` for a complete implementation with comment service integration.

## License

MIT


### Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-native @expo/vector-icons react-native-safe-area-context
```

## Components

### GenericChatPanel

A flexible chat panel component that can be used for any chat interface.

```tsx
import { GenericChatPanel, ChatMessage } from 'iris-chat';

const messages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'user-1',
    senderName: 'John Doe',
    text: 'Hello!',
    createdAt: new Date().toISOString(),
  },
];

<GenericChatPanel
  title="Chat"
  messages={messages}
  currentUserId="current-user-id"
  onSendMessage={(text) => console.log('Sending:', text)}
  placeholder="Type a message..."
/>
```

### ChatPanel

A pre-configured chat panel for trade/transaction discussions.

```tsx
import { ChatPanel, ChatMessage } from 'iris-chat';

<ChatPanel
  messages={messages}
  currentUserId="current-user-id"
  onSendMessage={(text) => handleSend(text)}
/>
```

### ChatDrawer

A mobile-friendly drawer-style chat interface with buddy list (native only).

```tsx
import { ChatDrawer } from 'iris-chat';

<ChatDrawer
  isOpen={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
/>
```

### PlatformPressable

A cross-platform pressable component that works on both native and web.

```tsx
import { PlatformPressable } from 'iris-chat';

<PlatformPressable onPress={() => console.log('Pressed!')}>
  <Text>Click me</Text>
</PlatformPressable>
```

## Types

### ChatMessage

```typescript
interface ChatMessage {
  id: string;
  tradeSessionId?: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
  type?: 'user' | 'system';
}
```

### Buddy

```typescript
interface Buddy {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  unreadCount?: number;
}
```

## Usage in Everglee (or your project)

### Install locally during development:

```bash
cd /Users/jonaohana/Desktop/web-dev/everglee
npm install ../iris-chat
```

### Update imports in your code:

```tsx
// Before
import { GenericChatPanel } from './components/GenericChatPanel';
import { ChatPanel } from './components/ChatPanel';

// After
import { GenericChatPanel, ChatPanel } from 'iris-chat';
```

## Development

```bash
# Build the package
npm run build

# Watch for changes
npm run watch
```

## License

MIT

## Author

Created for the Everglee marketplace platform.
