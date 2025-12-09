// Chat Message Types
export interface ChatMessage {
  id: string;
  tradeSessionId?: string; // Optional for general chat, required for trade chat
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
  type?: 'user' | 'system';
}

// Buddy/Contact Types
export interface Buddy {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  unreadCount?: number;
}

// Component Props
export interface ChatPanelProps {
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
}

export interface GenericChatPanelProps {
  title: string;
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
  placeholder?: string;
}

export interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
