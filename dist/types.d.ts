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
import type { CommentTheme } from './theme';
export interface CommentPanelProps {
    /** Optional color overrides so the host app can match its own theme (e.g. dark mode). */
    theme?: Partial<CommentTheme>;
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
    /**
     * Inline / embedded mode (e.g. a thread expanded inside a feed card): the
     * panel sizes to its content instead of `flex: 1` (which collapses to 0px on
     * native when the parent has no fixed height), the list scrolls once it
     * passes `inlineMaxListHeight`, and the input stays visible below it.
     */
    inline?: boolean;
    inlineMaxListHeight?: number;
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