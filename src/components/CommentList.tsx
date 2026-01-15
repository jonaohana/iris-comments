import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Comment } from '../types';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
  maxNestingLevel: number;
  onReply: (text: string, parentId: string) => void;
  onEdit?: (commentId: string, text: string) => void;
  onDelete?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
  onUnlike?: (commentId: string) => void;
  enableLikes: boolean;
  enableEditing: boolean;
  enableDeleting: boolean;
  enableReplies: boolean;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  maxNestingLevel,
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
  // Organize comments into a tree structure
  const organizeComments = (allComments: Comment[]) => {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];
    const replyMap = new Map<string, Comment[]>();

    // First pass: create map of all comments
    allComments.forEach((comment) => {
      commentMap.set(comment.id, comment);
    });

    // Second pass: organize into tree
    allComments.forEach((comment) => {
      if (!comment.parentId) {
        rootComments.push(comment);
      } else {
        const replies = replyMap.get(comment.parentId) || [];
        replies.push(comment);
        replyMap.set(comment.parentId, replies);
      }
    });

    return { rootComments, replyMap };
  };

  const { rootComments, replyMap } = organizeComments(comments);

  const getRepliesForComment = (commentId: string): Comment[] => {
    return replyMap.get(commentId) || [];
  };

  return (
    <View style={styles.container}>
      {rootComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
          currentUserAvatar={currentUserAvatar}
          nestingLevel={0}
          maxNestingLevel={maxNestingLevel}
          replies={getRepliesForComment(comment.id)}
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
    flex: 1,
    paddingHorizontal: 12,
  },
});
