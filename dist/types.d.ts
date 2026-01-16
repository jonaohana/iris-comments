export interface Comment {
    id: string;
    entityId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    text: string;
    createdAt: string;
    updatedAt?: string;
    parentId?: string;
    likes: string[];
    isEdited?: boolean;
}
export interface CommentReaction {
    commentId: string;
    userId: string;
    type: 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry';
    createdAt: string;
}
export interface CommentPanelProps {
    entityId: string;
    comments: Comment[];
    currentUserId: string;
    currentUserName: string;
    currentUserAvatar?: string;
    onAddComment: (text: string, parentId?: string) => void;
    onEditComment?: (commentId: string, text: string) => void;
    onDeleteComment?: (commentId: string) => void;
    onLikeComment?: (commentId: string) => void;
    onUnlikeComment?: (commentId: string) => void;
    placeholder?: string;
    title?: string;
    showHeader?: boolean;
    maxNestingLevel?: number;
    enableLikes?: boolean;
    enableEditing?: boolean;
    enableDeleting?: boolean;
    enableReplies?: boolean;
}
export interface CommentItemProps {
    comment: Comment;
    currentUserId: string;
    currentUserName: string;
    currentUserAvatar?: string;
    nestingLevel: number;
    maxNestingLevel: number;
    replies: Comment[];
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
export interface CommentInputProps {
    onSubmit: (text: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    initialValue?: string;
    onCancel?: () => void;
    showCancel?: boolean;
}
//# sourceMappingURL=types.d.ts.map