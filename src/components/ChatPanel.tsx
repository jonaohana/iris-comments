import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GenericChatPanel } from './GenericChatPanel';
import { ChatMessage, ChatPanelProps } from '../types';

export function ChatPanel({ messages, currentUserId, onSendMessage }: ChatPanelProps) {
  return (
    <View style={styles.container}>
      <GenericChatPanel
        title="Trade Chat"
        messages={messages}
        currentUserId={currentUserId}
        onSendMessage={onSendMessage}
        placeholder="Discuss the trade..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
