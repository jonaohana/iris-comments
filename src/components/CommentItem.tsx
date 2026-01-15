import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommentItemProps } from '../types';
import { CommentInput } from './CommentInput';

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  nestingLevel,
  maxNestingLevel,
  replies,
  onReply,
  onEdit,
  onDelete,
  onLike,
  onUnlike,
  enableLikes,
  enableEditing,
  enableDeleting,
  enableReplies,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const isOwner = comment.userId === currentUserId;
  const isLiked = comment.likes.includes(currentUserId);
  const canReply = enableReplies && nestingLevel < maxNestingLevel;

  const handleLikeToggle = () => {
    if (isLiked) {
      onUnlike?.(comment.id);
    } else {
      onLike?.(comment.id);
    }
  };

  const handleReply = (text: string) => {
    onReply(text, comment.id);
    setShowReplyInput(false);
  };

  const handleEdit = (text: string) => {
    onEdit?.(comment.id, text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      onDelete?.(comment.id);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const leftMargin = nestingLevel * 30;

  return (
    <View style={[styles.container, { marginLeft: leftMargin }]}>
      <View style={styles.commentContent}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {comment.userAvatar ? (
            <Image source={{ uri: comment.userAvatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {comment.userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.userName}>{comment.userName}</Text>
            <Text style={styles.timestamp}>
              {formatTimestamp(comment.createdAt)}
              {comment.isEdited && ' (edited)'}
            </Text>
          </View>

          {/* Comment Text or Edit Input */}
          {isEditing ? (
            <CommentInput
              onSubmit={handleEdit}
              onCancel={() => setIsEditing(false)}
              showCancel={true}
              initialValue={comment.text}
              placeholder="Edit comment..."
              autoFocus={true}
            />
          ) : (
            <Text style={styles.commentText}>{comment.text}</Text>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            {enableLikes && (
              <TouchableOpacity
                onPress={handleLikeToggle}
                style={styles.actionButton}
              >
                <Ionicons
                  name={isLiked ? 'heart' : 'heart-outline'}
                  size={16}
                  color={isLiked ? '#ff3b30' : '#666'}
                />
                {comment.likes.length > 0 && (
                  <Text style={[styles.actionText, isLiked && styles.likedText]}>
                    {comment.likes.length}
                  </Text>
                )}
              </TouchableOpacity>
            )}

            {canReply && (
              <TouchableOpacity
                onPress={() => setShowReplyInput(!showReplyInput)}
                style={styles.actionButton}
              >
                <Ionicons name="chatbubble-outline" size={14} color="#666" />
                <Text style={styles.actionText}>Reply</Text>
              </TouchableOpacity>
            )}

            {isOwner && enableEditing && !isEditing && (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                style={styles.actionButton}
              >
                <Ionicons name="create-outline" size={14} color="#666" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
            )}

            {isOwner && enableDeleting && (
              <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
                <Ionicons name="trash-outline" size={14} color="#ff3b30" />
                <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Reply Input */}
          {showReplyInput && (
            <View style={styles.replyInputContainer}>
              <CommentInput
                onSubmit={handleReply}
                onCancel={() => setShowReplyInput(false)}
                showCancel={true}
                placeholder={`Reply to ${comment.userName}...`}
                autoFocus={true}
              />
            </View>
          )}

          {/* Show/Hide Replies Toggle */}
          {replies.length > 0 && (
            <TouchableOpacity
              onPress={() => setShowReplies(!showReplies)}
              style={styles.toggleReplies}
            >
              <Ionicons
                name={showReplies ? 'chevron-up' : 'chevron-down'}
                size={14}
                color="#007AFF"
              />
              <Text style={styles.toggleRepliesText}>
                {showReplies ? 'Hide' : 'Show'} {replies.length}{' '}
                {replies.length === 1 ? 'reply' : 'replies'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Nested Replies */}
      {showReplies &&
        replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            currentUserId={currentUserId}
            currentUserName={currentUserName}
            currentUserAvatar={currentUserAvatar}
            nestingLevel={nestingLevel + 1}
            maxNestingLevel={maxNestingLevel}
            replies={[]} // Simplified - in real app, filter replies recursively
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            onLike={onLike}
            onUnlike={onUnlike}
            enableLikes={enableLikes}
            enableEditing={enableEditing}
            enableDeleting={enableDeleting}
            enableReplies={enableReplies}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  commentContent: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  likedText: {
    color: '#ff3b30',
  },
  deleteText: {
    color: '#ff3b30',
  },
  replyInputContainer: {
    marginTop: 8,
  },
  toggleReplies: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  toggleRepliesText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
});
