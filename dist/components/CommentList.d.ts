import React from 'react';
import { Comment } from '../types';
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
export declare const CommentList: React.FC<CommentListProps>;
export {};
//# sourceMappingURL=CommentList.d.ts.map