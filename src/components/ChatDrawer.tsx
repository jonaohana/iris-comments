import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, FlatList, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GenericChatPanel } from './GenericChatPanel';
import { PlatformPressable } from './PlatformPressable';
import { ChatMessage, Buddy, ChatDrawerProps } from '../types';
import { Ionicons } from '@expo/vector-icons';

export function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [activeTab, setActiveTab] = useState<'buddies' | 'chat'>('buddies');
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'system',
      senderName: 'System',
      text: 'Welcome to Iris Chat!',
      createdAt: new Date().toISOString(),
      type: 'system',
    },
  ]);
  const [buddies, setBuddies] = useState<Buddy[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'online',
      lastMessage: 'Hey! Is that item still available?',
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      status: 'online',
      lastMessage: 'Thanks for the trade!',
    },
    {
      id: '3',
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/150?img=5',
      status: 'away',
      lastMessage: 'Let me know when you\'re free',
    },
    {
      id: '4',
      name: 'Alex Thompson',
      avatar: 'https://i.pravatar.cc/150?img=8',
      status: 'offline',
      lastMessage: 'Sounds good',
    },
  ]);
  const currentUserId = 'current-user'; // TODO: Replace with actual user ID from auth

  useEffect(() => {
    if (isOpen) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, slideAnim]);

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'You',
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);

    // TODO: Send message to backend
  };

  const handleBuddyPress = (buddy: Buddy) => {
    setSelectedBuddy(buddy);
    setActiveTab('chat');
    // TODO: Load chat history for this buddy
  };

  const handleBackToBuddies = () => {
    setSelectedBuddy(null);
    setActiveTab('buddies');
  };

  const getStatusColor = (status: Buddy['status']) => {
    switch (status) {
      case 'online':
        return '#10b981';
      case 'away':
        return '#f59e0b';
      case 'offline':
        return '#9ca3af';
    }
  };

  const renderBuddy = ({ item }: { item: Buddy }) => (
    <PlatformPressable
      style={styles.buddyItem}
      onPress={() => handleBuddyPress(item)}
    >
      <View style={styles.buddyAvatar}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
        )}
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
      </View>
      
      <View style={styles.buddyInfo}>
        <View style={styles.buddyHeader}>
          <Text style={styles.buddyName}>{item.name}</Text>
          {item.unreadCount && item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        {item.lastMessage && (
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        )}
      </View>
      
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </PlatformPressable>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <PlatformPressable
        style={styles.backdrop}
        onPress={onClose}
      >
        <View style={StyleSheet.absoluteFill} />
      </PlatformPressable>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateY: slideAnim }],
            paddingBottom: insets.bottom + 60, // Account for bottom nav
          },
        ]}
      >
        <View style={styles.handle}>
          <View style={styles.handleBar} />
        </View>

        <View style={styles.content}>
          {/* Header with tabs */}
          <View style={styles.header}>
            {selectedBuddy ? (
              // Chat header with back button
              <View style={styles.chatHeader}>
                <PlatformPressable onPress={handleBackToBuddies} style={styles.backButton}>
                  <Ionicons name="chevron-back" size={24} color="#007AFF" />
                </PlatformPressable>
                <View style={styles.chatHeaderInfo}>
                  <Text style={styles.chatHeaderName}>{selectedBuddy.name}</Text>
                  <Text style={styles.chatHeaderStatus}>{selectedBuddy.status}</Text>
                </View>
              </View>
            ) : (
              // Tabs header
              <View style={styles.tabsContainer}>
                <PlatformPressable
                  style={[styles.tab, activeTab === 'buddies' && styles.tabActive]}
                  onPress={() => setActiveTab('buddies')}
                >
                  <Ionicons 
                    name="people" 
                    size={20} 
                    color={activeTab === 'buddies' ? '#007AFF' : '#6b7280'} 
                  />
                  <Text style={[styles.tabText, activeTab === 'buddies' && styles.tabTextActive]}>
                    Buddies
                  </Text>
                </PlatformPressable>
                
                <PlatformPressable
                  style={[styles.tab, activeTab === 'chat' && styles.tabActive]}
                  onPress={() => setActiveTab('chat')}
                >
                  <Ionicons 
                    name="chatbubbles" 
                    size={20} 
                    color={activeTab === 'chat' ? '#007AFF' : '#6b7280'} 
                  />
                  <Text style={[styles.tabText, activeTab === 'chat' && styles.tabTextActive]}>
                    Community
                  </Text>
                </PlatformPressable>
              </View>
            )}
          </View>

          {/* Content area */}
          {selectedBuddy ? (
            // Direct chat with selected buddy
            <View style={styles.chatContent}>
              <GenericChatPanel
                title={selectedBuddy.name}
                messages={messages}
                currentUserId={currentUserId}
                onSendMessage={handleSendMessage}
                placeholder={`Message ${selectedBuddy.name}...`}
              />
            </View>
          ) : activeTab === 'buddies' ? (
            // Buddy list
            <FlatList
              data={buddies}
              renderItem={renderBuddy}
              keyExtractor={(item) => item.id}
              style={styles.buddyList}
              contentContainerStyle={styles.buddyListContent}
            />
          ) : (
            // Community chat
            <View style={styles.chatContent}>
              <GenericChatPanel
                title="Community Chat"
                messages={messages}
                currentUserId={currentUserId}
                onSendMessage={handleSendMessage}
                placeholder="Chat with the community..."
              />
            </View>
          )}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  handle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handleBar: {
    width: 36,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2937',
  },
  chatHeaderStatus: {
    fontSize: 13,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  buddyList: {
    flex: 1,
  },
  buddyListContent: {
    paddingVertical: 8,
  },
  buddyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  buddyAvatar: {
    position: 'relative',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buddyInfo: {
    flex: 1,
  },
  buddyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  buddyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  chatContent: {
    flex: 1,
  },
});
