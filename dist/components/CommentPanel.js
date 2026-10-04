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
exports.CommentPanel = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const vector_icons_1 = require("@expo/vector-icons");
const CommentList_1 = require("./CommentList");
const CommentInput_1 = require("./CommentInput");
const theme_1 = require("../theme");
const CommentPanel = ({ entityId, comments, currentUserId, currentUserName, currentUserAvatar, onAddComment, onEditComment, onDeleteComment, onLikeComment, onUnlikeComment, placeholder = 'Write a comment...', title = 'Comments', showHeader = true, maxNestingLevel = 3, enableLikes = true, enableEditing = true, enableDeleting = true, enableReplies = true, theme, inline = false, inlineMaxListHeight = 320, }) => {
    const [sortBy, setSortBy] = (0, react_1.useState)('newest');
    const t = { ...theme_1.DEFAULT_COMMENT_THEME, ...(theme ?? {}) };
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
    const handleAddComment = (text) => {
        onAddComment(text);
    };
    const handleReply = (text, parentId) => {
        onAddComment(text, parentId);
    };
    const commentCount = comments.length;
    const sortBtn = (key, label) => {
        const active = sortBy === key;
        return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => setSortBy(key), style: [styles.sortButton, { backgroundColor: active ? t.accent : t.surface }] },
            react_1.default.createElement(react_native_1.Text, { style: [styles.sortButtonText, { color: active ? '#fff' : t.textMuted }] }, label)));
    };
    return (react_1.default.createElement(theme_1.CommentThemeContext.Provider, { value: t },
        react_1.default.createElement(react_native_1.View, { style: [styles.container, inline ? styles.containerInline : null, { backgroundColor: t.background }] },
            showHeader && (react_1.default.createElement(react_native_1.View, { style: [styles.header, { borderBottomColor: t.border }] },
                react_1.default.createElement(react_native_1.View, { style: styles.headerLeft },
                    react_1.default.createElement(vector_icons_1.Ionicons, { name: "chatbubbles", size: 20, color: t.accent }),
                    react_1.default.createElement(react_native_1.Text, { style: [styles.title, { color: t.text }] }, title),
                    react_1.default.createElement(react_native_1.View, { style: [styles.countBadge, { backgroundColor: t.surface }] },
                        react_1.default.createElement(react_native_1.Text, { style: [styles.countText, { color: t.textMuted }] }, commentCount))),
                react_1.default.createElement(react_native_1.View, { style: styles.sortContainer },
                    sortBtn('newest', 'Newest'),
                    sortBtn('popular', 'Popular'),
                    sortBtn('oldest', 'Oldest')))),
            react_1.default.createElement(react_native_1.ScrollView, { style: [styles.scrollView, inline ? { flex: 0, flexGrow: 0, maxHeight: inlineMaxListHeight } : null], contentContainerStyle: [styles.scrollContent, inline ? styles.scrollContentInline : null], showsVerticalScrollIndicator: react_native_1.Platform.OS === 'web', nestedScrollEnabled: inline }, sortedComments.length > 0 ? (react_1.default.createElement(CommentList_1.CommentList, { comments: sortedComments, currentUserId: currentUserId, currentUserName: currentUserName, currentUserAvatar: currentUserAvatar, maxNestingLevel: maxNestingLevel, onReply: handleReply, onEdit: onEditComment, onDelete: onDeleteComment, onLike: onLikeComment, onUnlike: onUnlikeComment, enableLikes: enableLikes, enableEditing: enableEditing, enableDeleting: enableDeleting, enableReplies: enableReplies })) : (react_1.default.createElement(react_native_1.View, { style: [styles.emptyState, inline ? { flex: 0, paddingVertical: 20 } : null] },
                react_1.default.createElement(vector_icons_1.Ionicons, { name: "chatbubbles-outline", size: 48, color: t.textFaint }),
                react_1.default.createElement(react_native_1.Text, { style: [styles.emptyStateText, { color: t.textFaint }] }, "No comments yet"),
                react_1.default.createElement(react_native_1.Text, { style: [styles.emptyStateSubtext, { color: t.textFaint }] }, "Be the first to comment!")))),
            react_1.default.createElement(CommentInput_1.CommentInput, { onSubmit: handleAddComment, placeholder: placeholder }))));
};
exports.CommentPanel = CommentPanel;
const styles = react_native_1.StyleSheet.create({
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
