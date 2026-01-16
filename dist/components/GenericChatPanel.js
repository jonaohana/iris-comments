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
exports.GenericChatPanel = GenericChatPanel;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const PlatformPressable_1 = require("./PlatformPressable");
const vector_icons_1 = require("@expo/vector-icons");
function GenericChatPanel({ title, messages, currentUserId, onSendMessage, placeholder = "Type a message...", }) {
    const [messageText, setMessageText] = (0, react_1.useState)('');
    const flatListRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // Auto-scroll to bottom when new messages arrive
        if (messages.length > 0 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);
    const handleSend = () => {
        if (messageText.trim()) {
            onSendMessage(messageText.trim());
            setMessageText('');
        }
    };
    const handleKeyPress = (e) => {
        if (react_native_1.Platform.OS === 'web' && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    const handleAttachment = () => {
        // TODO: Implement file picker
        console.log('Attachment clicked');
    };
    const renderMessage = ({ item }) => {
        const isOwnMessage = item.senderId === currentUserId;
        const isSystem = item.type === 'system';
        if (isSystem) {
            return (react_1.default.createElement(react_native_1.View, { style: styles.systemMessageContainer },
                react_1.default.createElement(react_native_1.Text, { style: styles.systemMessageText }, item.text)));
        }
        return (react_1.default.createElement(react_native_1.View, { style: [styles.messageContainer, isOwnMessage && styles.ownMessageContainer] },
            !isOwnMessage && (react_1.default.createElement(react_native_1.Text, { style: styles.senderName }, item.senderName)),
            react_1.default.createElement(react_native_1.View, { style: [styles.messageBubble, isOwnMessage && styles.ownMessageBubble] },
                react_1.default.createElement(react_native_1.Text, { style: [styles.messageText, isOwnMessage && styles.ownMessageText] }, item.text),
                react_1.default.createElement(react_native_1.Text, { style: [styles.messageTime, isOwnMessage && styles.ownMessageTime] }, new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })))));
    };
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_1.View, { style: styles.header },
            react_1.default.createElement(react_native_1.Text, { style: styles.headerTitle }, title)),
        react_1.default.createElement(react_native_1.FlatList, { ref: flatListRef, data: messages, renderItem: renderMessage, keyExtractor: (item) => item.id, style: styles.messagesList, contentContainerStyle: styles.messagesContent, onContentSizeChange: () => flatListRef.current?.scrollToEnd({ animated: true }) }),
        react_1.default.createElement(react_native_1.KeyboardAvoidingView, { behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : 'height' },
            react_1.default.createElement(react_native_1.View, { style: styles.inputContainer },
                react_1.default.createElement(PlatformPressable_1.PlatformPressable, { style: styles.attachButton, onPress: handleAttachment },
                    react_1.default.createElement(vector_icons_1.Ionicons, { name: "attach-outline", size: 27, color: "#007AFF" })),
                react_1.default.createElement(react_native_1.TextInput, { style: styles.input, value: messageText, onChangeText: setMessageText, placeholder: placeholder, onKeyPress: handleKeyPress, multiline: react_native_1.Platform.OS !== 'web', numberOfLines: react_native_1.Platform.OS === 'web' ? 1 : 3 }),
                react_1.default.createElement(PlatformPressable_1.PlatformPressable, { style: [styles.sendButton, !messageText.trim() && styles.sendButtonDisabled], onPress: handleSend, disabled: !messageText.trim() },
                    react_1.default.createElement(vector_icons_1.Ionicons, { name: "send", size: 24, color: "#fff" }))))));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        backgroundColor: '#f9fafb',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
        fontFamily: react_native_1.Platform.select({
            ios: 'System',
            android: 'Roboto',
            web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            default: 'System',
        }),
    },
    messagesList: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
    },
    messageContainer: {
        marginBottom: 16,
        maxWidth: '70%',
        alignSelf: 'flex-start',
    },
    ownMessageContainer: {
        alignSelf: 'flex-end',
    },
    senderName: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 4,
        marginLeft: 4,
        fontWeight: '600',
        fontFamily: react_native_1.Platform.select({
            ios: 'System',
            android: 'Roboto',
            web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            default: 'System',
        }),
    },
    messageBubble: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 12,
    },
    ownMessageBubble: {
        backgroundColor: '#007AFF',
    },
    messageText: {
        fontSize: 15,
        color: '#1f2937',
        marginBottom: 4,
        lineHeight: 20,
        fontFamily: react_native_1.Platform.select({
            ios: 'System',
            android: 'Roboto',
            web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            default: 'System',
        }),
    },
    ownMessageText: {
        color: '#fff',
    },
    messageTime: {
        fontSize: 10,
        color: '#9ca3af',
    },
    ownMessageTime: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    systemMessageContainer: {
        alignItems: 'center',
        marginBottom: 12,
    },
    systemMessageText: {
        fontSize: 12,
        color: '#9ca3af',
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        gap: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    attachButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f0f7ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#007AFF20',
        flexShrink: 0,
    },
    input: react_native_1.Platform.select({
        web: {
            flex: 1,
            height: 38,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 19,
            paddingHorizontal: 16,
            paddingVertical: 0,
            fontSize: 15,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            backgroundColor: '#fafafa',
            lineHeight: 38,
        },
        default: {
            flex: 1,
            height: 38,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 19,
            paddingHorizontal: 16,
            paddingVertical: 8,
            fontSize: 15,
            maxHeight: 80,
            fontFamily: 'System',
            backgroundColor: '#fafafa',
        },
    }),
    sendButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        flexShrink: 0,
        ...(react_native_1.Platform.OS === 'web' && {
            width: 22,
            height: 22,
            borderRadius: 11,
        }),
    },
    sendButtonDisabled: {
        backgroundColor: '#d1d5db',
        shadowOpacity: 0,
        elevation: 0,
    },
});
