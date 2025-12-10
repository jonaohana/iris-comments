import React, { useState } from 'react';
import { GenericChatPanel } from './GenericChatPanel';
import { ChatMessage, Buddy, ChatBarProps } from '../types';
import { Ionicons } from '@expo/vector-icons';

export function ChatBar({ isOpen = false, onClose }: ChatBarProps) {
  const [activeTab, setActiveTab] = useState<'buddies' | 'chat'>('buddies');
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'system',
      senderName: 'System',
      text: 'Welcome to Iris chat!',
      createdAt: new Date().toISOString(),
      type: 'system',
    },
  ]);
  const [buddies] = useState<Buddy[]>([
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
  const currentUserId = 'current-user';

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'You',
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleClose = () => {
    setSelectedBuddy(null);
    setActiveTab('buddies');
    onClose?.();
  };

  const handleBuddyClick = (buddy: Buddy) => {
    setSelectedBuddy(buddy);
    setActiveTab('chat');
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

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            right: '0',
            width: '400px',
            height: '600px',
            maxHeight: 'calc(100vh - 100px)',
            backgroundColor: '#fff',
            borderRadius: '12px 12px 0 0',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
            zIndex: 1003,
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          {/* Close button */}
          <div
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <span style={{ fontSize: '14px', color: '#6b7280' }}>✕</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {/* Header */}
            {selectedBuddy ? (
              // Chat header with back button
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: '#fff',
                gap: '12px',
              }}>
                <button
                  onClick={handleBackToBuddies}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#007AFF',
                    fontSize: '20px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                    marginLeft: '-4px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  ←
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontSize: '17px', 
                    fontWeight: '600', 
                    color: '#111827',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    lineHeight: '1.3',
                  }}>
                    {selectedBuddy.name}
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#6b7280', 
                    textTransform: 'capitalize',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    lineHeight: '1.3',
                    marginTop: '2px',
                  }}>
                    {selectedBuddy.status}
                  </div>
                </div>
              </div>
            ) : (
              // Tabs header with proper spacing from close button
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #e5e7eb',
                paddingRight: '48px', // Add padding to prevent overlap with close button
              }}>
                <button
                  onClick={() => setActiveTab('buddies')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'buddies' ? '2px solid #007AFF' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: activeTab === 'buddies' ? '600' : '500',
                    color: activeTab === 'buddies' ? '#007AFF' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  <Ionicons 
                    name="people" 
                    size={20} 
                    color={activeTab === 'buddies' ? '#007AFF' : '#6b7280'} 
                  />
                  Buddies
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'chat' ? '2px solid #007AFF' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: activeTab === 'chat' ? '600' : '500',
                    color: activeTab === 'chat' ? '#007AFF' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  <Ionicons 
                    name="chatbubbles" 
                    size={20} 
                    color={activeTab === 'chat' ? '#007AFF' : '#6b7280'} 
                  />
                  Community
                </button>
              </div>
            )}

            {/* Content */}
            {selectedBuddy ? (
              // Direct chat with selected buddy
              <div style={{ flex: 1, minHeight: 0 }}>
                <GenericChatPanel
                  title={selectedBuddy.name}
                  messages={messages}
                  currentUserId={currentUserId}
                  onSendMessage={handleSendMessage}
                  placeholder={`Message ${selectedBuddy.name}...`}
                />
              </div>
            ) : activeTab === 'buddies' ? (
              // Buddy list
              <div style={{ flex: 1, overflow: 'auto' }}>
                {buddies.map((buddy) => (
                  <div
                    key={buddy.id}
                    onClick={() => handleBuddyClick(buddy)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      gap: '12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {/* Avatar */}
                    <div style={{ position: 'relative' }}>
                      {buddy.avatar ? (
                        <img
                          src={buddy.avatar}
                          alt={buddy.name}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: '#007AFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#fff',
                        }}>
                          {buddy.name.charAt(0)}
                        </div>
                      )}
                      {/* Status dot */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(buddy.status),
                        border: '2px solid #fff',
                      }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px',
                      }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1f2937',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        }}>
                          {buddy.name}
                        </span>
                        {buddy.unreadCount && buddy.unreadCount > 0 && (
                          <div style={{
                            backgroundColor: '#007AFF',
                            borderRadius: '10px',
                            minWidth: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0 6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#fff',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          }}>
                            {buddy.unreadCount}
                          </div>
                        )}
                      </div>
                      {buddy.lastMessage && (
                        <div style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        }}>
                          {buddy.lastMessage}
                        </div>
                      )}
                    </div>

                    {/* Chevron */}
                    <span style={{ color: '#9ca3af', fontSize: '20px' }}>›</span>
                  </div>
                ))}
              </div>
            ) : (
              // Community chat
              <div style={{ flex: 1, minHeight: 0 }}>
                <GenericChatPanel
                  title="Community Chat"
                  messages={messages}
                  currentUserId={currentUserId}
                  onSendMessage={handleSendMessage}
                  placeholder="Chat with the community..."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS animation */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
