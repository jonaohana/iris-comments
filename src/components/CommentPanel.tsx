import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommentPanelProps } from '../types';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';
import { CommentThemeContext, DEFAULT_COMMENT_THEME } from '../theme';

export const CommentPanel: React.FC<CommentPanelProps> = ({
  entityId,
  comments,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onUnlikeComment,
  placeholder = 'Write a comment...',
  title = 'Comments',
  showHeader = true,
  maxNestingLevel = 3,
  enableLikes = true,
  enableEditing = true,
  enableDeleting = true,
  enableReplies = true,
  theme,
  inline = false,
  inlineMaxListHeight = 320,
}) => {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const t = { ...DEFAULT_COMMENT_THEME, ...(theme ?? {}) };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'popular':
        return b.likes.length - a.likes.length;
      default:
        return 0;
    }
  });

  const handleAddComment = (text: string) => {
    onAddComment(text);
  };

  const handleReply = (text: string, parentId: string) => {
    onAddComment(text, parentId);
  };

  const commentCount = comments.length;

  const sortBtn = (key: 'newest' | 'oldest' | 'popular', label: string) => {
    const active = sortBy === key;
    return (
      <TouchableOpacity
        onPress={() => setSortBy(key)}
        style={[styles.sortButton, { backgroundColor: active ? t.accent : t.surface }]}
      >
        <Text style={[styles.sortButtonText, { color: active ? '#fff' : t.textMuted }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <CommentThemeContext.Provider value={t}>
    <View style={[styles.container, inline ? styles.containerInline : null, { backgroundColor: t.background }]}>
      {showHeader && (
        <View style={[styles.header, { borderBottomColor: t.border }]}>
          <View style={styles.headerLeft}>
            <Ionicons name="chatbubbles" size={20} color={t.accent} />
            <Text style={[styles.title, { color: t.text }]}>{title}</Text>
            <View style={[styles.countBadge, { backgroundColor: t.surface }]}>
              <Text style={[styles.countText, { color: t.textMuted }]}>{commentCount}</Text>
            </View>
          </View>

          {/* Sort Options */}
          <View style={styles.sortContainer}>
            {sortBtn('newest', 'Newest')}
            {sortBtn('popular', 'Popular')}
            {sortBtn('oldest', 'Oldest')}
          </View>
        </View>
      )}

      {/* Comment List */}
      <ScrollView
        style={[styles.scrollView, inline ? { flex: 0, flexGrow: 0, maxHeight: inlineMaxListHeight } : null]}
        contentContainerStyle={[styles.scrollContent, inline ? styles.scrollContentInline : null]}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
        nestedScrollEnabled={inline}
      >
        {sortedComments.length > 0 ? (
          <CommentList
            comments={sortedComments}
            currentUserId={currentUserId}
            currentUserName={currentUserName}
            currentUserAvatar={currentUserAvatar}
            maxNestingLevel={maxNestingLevel}
            onReply={handleReply}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
            onLike={onLikeComment}
            onUnlike={onUnlikeComment}
            enableLikes={enableLikes}
            enableEditing={enableEditing}
            enableDeleting={enableDeleting}
            enableReplies={enableReplies}
          />
        ) : (
          <View style={[styles.emptyState, inline ? { flex: 0, paddingVertical: 20 } : null]}>
            <Ionicons name="chatbubbles-outline" size={48} color={t.textFaint} />
            <Text style={[styles.emptyStateText, { color: t.textFaint }]}>No comments yet</Text>
            <Text style={[styles.emptyStateSubtext, { color: t.textFaint }]}>Be the first to comment!</Text>
          </View>
        )}
      </ScrollView>

      {/* Comment Input */}
      <CommentInput onSubmit={handleAddComment} placeholder={placeholder} />
    </View>
    </CommentThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerInline: {
    flex: 0,
    alignSelf: 'stretch',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  countBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  sortButtonActive: {
    backgroundColor: '#007AFF',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  scrollContentInline: {
    flexGrow: 0,
    paddingVertical: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
});
