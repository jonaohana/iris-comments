"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentList = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CommentItem_1 = require("./CommentItem");
const CommentList = ({ comments, currentUserId, currentUserName, currentUserAvatar, maxNestingLevel, onReply, onEdit, onDelete, onLike, onUnlike, enableLikes, enableEditing, enableDeleting, enableReplies, }) => {
    // Organize comments into a tree structure
    const organizeComments = (allComments) => {
        const commentMap = new Map();
        const rootComments = [];
        const replyMap = new Map();
        // First pass: create map of all comments
        allComments.forEach((comment) => {
            commentMap.set(comment.id, comment);
        });
        // Second pass: organize into tree
        allComments.forEach((comment) => {
            if (!comment.parentId) {
                rootComments.push(comment);
            }
            else {
                const replies = replyMap.get(comment.parentId) || [];
                replies.push(comment);
                replyMap.set(comment.parentId, replies);
            }
        });
        return { rootComments, replyMap };
    };
    const { rootComments, replyMap } = organizeComments(comments);
    const getRepliesForComment = (commentId) => {
        return replyMap.get(commentId) || [];
    };
    return (react_1.default.createElement(react_native_1.View, { style: styles.container }, rootComments.map((comment) => (react_1.default.createElement(CommentItem_1.CommentItem, { key: comment.id, comment: comment, currentUserId: currentUserId, currentUserName: currentUserName, currentUserAvatar: currentUserAvatar, nestingLevel: 0, maxNestingLevel: maxNestingLevel, replies: getRepliesForComment(comment.id), onReply: onReply, onEdit: onEdit, onDelete: onDelete, onLike: onLike, onUnlike: onUnlike, enableLikes: enableLikes, enableEditing: enableEditing, enableDeleting: enableDeleting, enableReplies: enableReplies })))));
};
exports.CommentList = CommentList;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
    },
});
