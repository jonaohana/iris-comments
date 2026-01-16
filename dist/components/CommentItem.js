"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentItem = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const vector_icons_1 = require("@expo/vector-icons");
const CommentInput_1 = require("./CommentInput");
const CommentItem = ({ comment, currentUserId, currentUserName, currentUserAvatar, nestingLevel, maxNestingLevel, replies, onReply, onEdit, onDelete, onLike, onUnlike, enableLikes, enableEditing, enableDeleting, enableReplies, }) => {
    const [showReplyInput, setShowReplyInput] = (0, react_1.useState)(false);
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [showReplies, setShowReplies] = (0, react_1.useState)(true);
    const isOwner = comment.userId === currentUserId;
    const isLiked = comment.likes.includes(currentUserId);
    const canReply = enableReplies && nestingLevel < maxNestingLevel;
    const handleLikeToggle = () => {
        if (isLiked) {
            onUnlike?.(comment.id);
        }
        else {
            onLike?.(comment.id);
        }
    };
    const handleReply = (text) => {
        onReply(text, comment.id);
        setShowReplyInput(false);
    };
    const handleEdit = (text) => {
        onEdit?.(comment.id, text);
        setIsEditing(false);
    };
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this comment?')) {
            onDelete?.(comment.id);
        }
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1)
            return 'Just now';
        if (diffMins < 60)
            return `${diffMins}m ago`;
        if (diffHours < 24)
            return `${diffHours}h ago`;
        if (diffDays < 7)
            return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };
    const leftMargin = nestingLevel * 30;
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { marginLeft: leftMargin }] },
        react_1.default.createElement(react_native_1.View, { style: styles.commentContent },
            react_1.default.createElement(react_native_1.View, { style: styles.avatarContainer }, comment.userAvatar ? (react_1.default.createElement(react_native_1.Image, { source: { uri: comment.userAvatar }, style: styles.avatar })) : (react_1.default.createElement(react_native_1.View, { style: [styles.avatar, styles.avatarPlaceholder] },
                react_1.default.createElement(react_native_1.Text, { style: styles.avatarText }, comment.userName.charAt(0).toUpperCase())))),
            react_1.default.createElement(react_native_1.View, { style: styles.mainContent },
                react_1.default.createElement(react_native_1.View, { style: styles.header },
                    react_1.default.createElement(react_native_1.Text, { style: styles.userName }, comment.userName),
                    react_1.default.createElement(react_native_1.Text, { style: styles.timestamp },
                        formatTimestamp(comment.createdAt),
                        comment.isEdited && ' (edited)')),
                isEditing ? (react_1.default.createElement(CommentInput_1.CommentInput, { onSubmit: handleEdit, onCancel: () => setIsEditing(false), showCancel: true, initialValue: comment.text, placeholder: "Edit comment...", autoFocus: true })) : (react_1.default.createElement(react_native_1.Text, { style: styles.commentText }, comment.text)),
                react_1.default.createElement(react_native_1.View, { style: styles.actions },
                    enableLikes && (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleLikeToggle, style: styles.actionButton },
                        react_1.default.createElement(vector_icons_1.Ionicons, { name: isLiked ? 'heart' : 'heart-outline', size: 16, color: isLiked ? '#ff3b30' : '#666' }),
                        comment.likes.length > 0 && (react_1.default.createElement(react_native_1.Text, { style: [styles.actionText, isLiked && styles.likedText] }, comment.likes.length)))),
                    canReply && (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => setShowReplyInput(!showReplyInput), style: styles.actionButton },
                        react_1.default.createElement(vector_icons_1.Ionicons, { name: "chatbubble-outline", size: 14, color: "#666" }),
                        react_1.default.createElement(react_native_1.Text, { style: styles.actionText }, "Reply"))),
                    isOwner && enableEditing && !isEditing && (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => setIsEditing(true), style: styles.actionButton },
                        react_1.default.createElement(vector_icons_1.Ionicons, { name: "create-outline", size: 14, color: "#666" }),
                        react_1.default.createElement(react_native_1.Text, { style: styles.actionText }, "Edit"))),
                    isOwner && enableDeleting && (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleDelete, style: styles.actionButton },
                        react_1.default.createElement(vector_icons_1.Ionicons, { name: "trash-outline", size: 14, color: "#ff3b30" }),
                        react_1.default.createElement(react_native_1.Text, { style: [styles.actionText, styles.deleteText] }, "Delete")))),
                showReplyInput && (react_1.default.createElement(react_native_1.View, { style: styles.replyInputContainer },
                    react_1.default.createElement(CommentInput_1.CommentInput, { onSubmit: handleReply, onCancel: () => setShowReplyInput(false), showCancel: true, placeholder: `Reply to ${comment.userName}...`, autoFocus: true }))),
                replies.length > 0 && (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => setShowReplies(!showReplies), style: styles.toggleReplies },
                    react_1.default.createElement(vector_icons_1.Ionicons, { name: showReplies ? 'chevron-up' : 'chevron-down', size: 14, color: "#007AFF" }),
                    react_1.default.createElement(react_native_1.Text, { style: styles.toggleRepliesText },
                        showReplies ? 'Hide' : 'Show',
                        " ",
                        replies.length,
                        ' ',
                        replies.length === 1 ? 'reply' : 'replies'))))),
        showReplies &&
            replies.map((reply) => (react_1.default.createElement(exports.CommentItem, { key: reply.id, comment: reply, currentUserId: currentUserId, currentUserName: currentUserName, currentUserAvatar: currentUserAvatar, nestingLevel: nestingLevel + 1, maxNestingLevel: maxNestingLevel, replies: [], onReply: onReply, onEdit: onEdit, onDelete: onDelete, onLike: onLike, onUnlike: onUnlike, enableLikes: enableLikes, enableEditing: enableEditing, enableDeleting: enableDeleting, enableReplies: enableReplies })))));
};
exports.CommentItem = CommentItem;
const styles = react_native_1.StyleSheet.create({
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
