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
const CommentPanel = ({ entityId, comments, currentUserId, currentUserName, currentUserAvatar, onAddComment, onEditComment, onDeleteComment, onLikeComment, onUnlikeComment, placeholder = 'Write a comment...', title = 'Comments', showHeader = true, maxNestingLevel = 3, enableLikes = true, enableEditing = true, enableDeleting = true, enableReplies = true, }) => {
    const [sortBy, setSortBy] = (0, react_1.useState)('newest');
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
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        showHeader && (react_1.default.createElement(react_native_1.View, { style: styles.header },
            react_1.default.createElement(react_native_1.View, { style: styles.headerLeft },
                react_1.default.createElement(vector_icons_1.Ionicons, { name: "chatbubbles", size: 20, color: "#007AFF" }),
                react_1.default.createElement(react_native_1.Text, { style: styles.title }, title),
                react_1.default.createElement(react_native_1.View, { style: styles.countBadge },
                    react_1.default.createElement(react_native_1.Text, { style: styles.countText }, commentCount))),
            react_1.default.createElement(react_native_1.View, { style: styles.sortContainer },
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => setSortBy('newest'), style: [styles.sortButton, sortBy === 'newest' && styles.sortButtonActive] },
                    react_1.default.createElement(react_native_1.Text, { style: [
                            styles.sortButtonText,
                            sortBy === 'newest' && styles.sortButtonTextActive,
                        ] }, "Newest")),
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => setSortBy('popular'), style: [styles.sortButton, sortBy === 'popular' && styles.sortButtonActive] },
                    react_1.default.createElement(react_native_1.Text, { style: [
                            styles.sortButtonText,
                            sortBy === 'popular' && styles.sortButtonTextActive,
                        ] }, "Popular")),
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => setSortBy('oldest'), style: [styles.sortButton, sortBy === 'oldest' && styles.sortButtonActive] },
                    react_1.default.createElement(react_native_1.Text, { style: [
                            styles.sortButtonText,
                            sortBy === 'oldest' && styles.sortButtonTextActive,
                        ] }, "Oldest"))))),
        react_1.default.createElement(react_native_1.ScrollView, { style: styles.scrollView, contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: react_native_1.Platform.OS === 'web' }, sortedComments.length > 0 ? (react_1.default.createElement(CommentList_1.CommentList, { comments: sortedComments, currentUserId: currentUserId, currentUserName: currentUserName, currentUserAvatar: currentUserAvatar, maxNestingLevel: maxNestingLevel, onReply: handleReply, onEdit: onEditComment, onDelete: onDeleteComment, onLike: onLikeComment, onUnlike: onUnlikeComment, enableLikes: enableLikes, enableEditing: enableEditing, enableDeleting: enableDeleting, enableReplies: enableReplies })) : (react_1.default.createElement(react_native_1.View, { style: styles.emptyState },
            react_1.default.createElement(vector_icons_1.Ionicons, { name: "chatbubbles-outline", size: 48, color: "#ccc" }),
            react_1.default.createElement(react_native_1.Text, { style: styles.emptyStateText }, "No comments yet"),
            react_1.default.createElement(react_native_1.Text, { style: styles.emptyStateSubtext }, "Be the first to comment!")))),
        react_1.default.createElement(CommentInput_1.CommentInput, { onSubmit: handleAddComment, placeholder: placeholder })));
};
exports.CommentPanel = CommentPanel;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
