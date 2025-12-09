# Iris Chat

A beautiful, cross-platform chat component library for React Native and React Native Web.

## Features

- 🌐 **Cross-platform**: Works seamlessly on iOS, Android, and Web
- 💬 **Multiple chat interfaces**: Generic chat panel, drawer-style chat, and buddy lists
- 🎨 **Customizable**: Clean, modern UI with iOS-inspired design
- 📱 **Responsive**: Adapts to different screen sizes and platforms
- ⚡ **Lightweight**: Minimal dependencies

## Installation

```bash
npm install iris-chat
```

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
