import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { PlatformPressable } from './PlatformPressable';
import { ChatMessage, GenericChatPanelProps } from '../types';
import { Ionicons } from '@expo/vector-icons';

export function GenericChatPanel({
  title,
  messages,
  currentUserId,
  onSendMessage,
  placeholder = "Type a message...",
}: GenericChatPanelProps) {
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };

  const handleKeyPress = (e: any) => {
    if (Platform.OS === 'web' && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = () => {
    // TODO: Implement file picker
    console.log('Attachment clicked');
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isOwnMessage = item.senderId === currentUserId;
    const isSystem = item.type === 'system';

    if (isSystem) {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{item.text}</Text>
        </View>
      );
    }

    return (
      <View style={[styles.messageContainer, isOwnMessage && styles.ownMessageContainer]}>
        {!isOwnMessage && (
          <Text style={styles.senderName}>{item.senderName}</Text>
        )}
        <View style={[styles.messageBubble, isOwnMessage && styles.ownMessageBubble]}>
          <Text style={[styles.messageText, isOwnMessage && styles.ownMessageText]}>
            {item.text}
          </Text>
          <Text style={[styles.messageTime, isOwnMessage && styles.ownMessageTime]}>
            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          <PlatformPressable
            style={styles.attachButton}
            onPress={handleAttachment}
          >
            <Ionicons name="attach-outline" size={27} color="#007AFF" />
          </PlatformPressable>
          <TextInput
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
            placeholder={placeholder}
            onKeyPress={handleKeyPress}
            multiline={Platform.OS !== 'web'}
            numberOfLines={Platform.OS === 'web' ? 1 : 3}
          />
          <PlatformPressable
            style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!messageText.trim()}
          >
            <Ionicons name="send" size={24} color="#fff" />
          </PlatformPressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      default: 'System',
    }),
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  ownMessageContainer: {
    alignSelf: 'flex-end',
  },
  senderName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    marginLeft: 4,
    fontWeight: '600',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      default: 'System',
    }),
  },
  messageBubble: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
  },
  ownMessageBubble: {
    backgroundColor: '#007AFF',
  },
  messageText: {
    fontSize: 15,
    color: '#1f2937',
    marginBottom: 4,
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      default: 'System',
    }),
  },
  ownMessageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 10,
    color: '#9ca3af',
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  systemMessageText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  attachButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#007AFF20',
    flexShrink: 0,
  },
  input: Platform.select({
    web: {
      flex: 1,
      height: 38,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 19,
      paddingHorizontal: 16,
      paddingVertical: 0,
      fontSize: 15,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#fafafa',
      lineHeight: 38,
    },
    default: {
      flex: 1,
      height: 38,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 19,
      paddingHorizontal: 16,
      paddingVertical: 8,
      fontSize: 15,
      maxHeight: 80,
      fontFamily: 'System',
      backgroundColor: '#fafafa',
    },
  }),
  sendButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    flexShrink: 0,
    ...(Platform.OS === 'web' && {
      width: 22,
      height: 22,
      borderRadius: 11,
    }),
  },
  sendButtonDisabled: {
    backgroundColor: '#d1d5db',
    shadowOpacity: 0,
    elevation: 0,
  },
});
