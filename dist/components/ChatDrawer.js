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
exports.ChatDrawer = ChatDrawer;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const GenericChatPanel_1 = require("./GenericChatPanel");
const PlatformPressable_1 = require("./PlatformPressable");
const vector_icons_1 = require("@expo/vector-icons");
function ChatDrawer({ isOpen, onClose }) {
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const slideAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(react_native_1.Dimensions.get('window').height)).current;
    const [activeTab, setActiveTab] = (0, react_1.useState)('buddies');
    const [selectedBuddy, setSelectedBuddy] = (0, react_1.useState)(null);
    const [messages, setMessages] = (0, react_1.useState)([
        {
            id: '1',
            senderId: 'system',
            senderName: 'System',
            text: 'Welcome to Iris Chat!',
            createdAt: new Date().toISOString(),
            type: 'system',
        },
    ]);
    const [buddies, setBuddies] = (0, react_1.useState)([
        {
            id: '1',
            name: 'Sarah Johnson',
            avatar: 'https://i.pravatar.cc/150?img=1',
            status: 'online',
            lastMessage: 'Hey! Is that item still available?',
            unreadCount: 2,
        },
        {
            id: '2',
            name: 'Mike Chen',
            avatar: 'https://i.pravatar.cc/150?img=12',
            status: 'online',
            lastMessage: 'Thanks for the trade!',
        },
        {
            id: '3',
            name: 'Emily Davis',
            avatar: 'https://i.pravatar.cc/150?img=5',
            status: 'away',
            lastMessage: 'Let me know when you\'re free',
        },
        {
            id: '4',
            name: 'Alex Thompson',
            avatar: 'https://i.pravatar.cc/150?img=8',
            status: 'offline',
            lastMessage: 'Sounds good',
        },
    ]);
    const currentUserId = 'current-user'; // TODO: Replace with actual user ID from auth
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            react_native_1.Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 4,
            }).start();
        }
        else {
            react_native_1.Animated.timing(slideAnim, {
                toValue: react_native_1.Dimensions.get('window').height,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpen, slideAnim]);
    const handleSendMessage = (text) => {
        const newMessage = {
            id: Date.now().toString(),
            senderId: currentUserId,
            senderName: 'You',
            text,
            createdAt: new Date().toISOString(),
        };
        setMessages([...messages, newMessage]);
        // TODO: Send message to backend
    };
    const handleBuddyPress = (buddy) => {
        setSelectedBuddy(buddy);
        setActiveTab('chat');
        // TODO: Load chat history for this buddy
    };
    const handleBackToBuddies = () => {
        setSelectedBuddy(null);
        setActiveTab('buddies');
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
                return '#10b981';
            case 'away':
                return '#f59e0b';
            case 'offline':
                return '#9ca3af';
        }
    };
    const renderBuddy = ({ item }) => (react_1.default.createElement(PlatformPressable_1.PlatformPressable, { style: styles.buddyItem, onPress: () => handleBuddyPress(item) },
        react_1.default.createElement(react_native_1.View, { style: styles.buddyAvatar },
            item.avatar ? (react_1.default.createElement(react_native_1.Image, { source: { uri: item.avatar }, style: styles.avatarImage })) : (react_1.default.createElement(react_native_1.View, { style: styles.avatarPlaceholder },
                react_1.default.createElement(react_native_1.Text, { style: styles.avatarText }, item.name.charAt(0)))),
            react_1.default.createElement(react_native_1.View, { style: [styles.statusDot, { backgroundColor: getStatusColor(item.status) }] })),
        react_1.default.createElement(react_native_1.View, { style: styles.buddyInfo },
            react_1.default.createElement(react_native_1.View, { style: styles.buddyHeader },
                react_1.default.createElement(react_native_1.Text, { style: styles.buddyName }, item.name),
                item.unreadCount && item.unreadCount > 0 && (react_1.default.createElement(react_native_1.View, { style: styles.unreadBadge },
                    react_1.default.createElement(react_native_1.Text, { style: styles.unreadText }, item.unreadCount)))),
            item.lastMessage && (react_1.default.createElement(react_native_1.Text, { style: styles.lastMessage, numberOfLines: 1 }, item.lastMessage))),
        react_1.default.createElement(vector_icons_1.Ionicons, { name: "chevron-forward", size: 20, color: "#9ca3af" })));
    if (!isOpen)
        return null;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(PlatformPressable_1.PlatformPressable, { style: styles.backdrop, onPress: onClose },
            react_1.default.createElement(react_native_1.View, { style: react_native_1.StyleSheet.absoluteFill })),
        react_1.default.createElement(react_native_1.Animated.View, { style: [
                styles.drawer,
                {
                    transform: [{ translateY: slideAnim }],
                    paddingBottom: insets.bottom + 60, // Account for bottom nav
                },
            ] },
            react_1.default.createElement(react_native_1.View, { style: styles.handle },
                react_1.default.createElement(react_native_1.View, { style: styles.handleBar })),
            react_1.default.createElement(react_native_1.View, { style: styles.content },
                react_1.default.createElement(react_native_1.View, { style: styles.header }, selectedBuddy ? (
                // Chat header with back button
                react_1.default.createElement(react_native_1.View, { style: styles.chatHeader },
                    react_1.default.createElement(PlatformPressable_1.PlatformPressable, { onPress: handleBackToBuddies, style: styles.backButton },
                        react_1.default.createElement(vector_icons_1.Ionicons, { name: "chevron-back", size: 24, color: "#007AFF" })),
                    react_1.default.createElement(react_native_1.View, { style: styles.chatHeaderInfo },
                        react_1.default.createElement(react_native_1.Text, { style: styles.chatHeaderName }, selectedBuddy.name),
                        react_1.default.createElement(react_native_1.Text, { style: styles.chatHeaderStatus }, selectedBuddy.status)))) : (
                // Tabs header
                react_1.default.createElement(react_native_1.View, { style: styles.tabsContainer },
                    react_1.default.createElement(PlatformPressable_1.PlatformPressable, { style: [styles.tab, activeTab === 'buddies' && styles.tabActive], onPress: () => setActiveTab('buddies') },
                        react_1.default.createElement(vector_icons_1.Ionicons, { name: "people", size: 20, color: activeTab === 'buddies' ? '#007AFF' : '#6b7280' }),
                        react_1.default.createElement(react_native_1.Text, { style: [styles.tabText, activeTab === 'buddies' && styles.tabTextActive] }, "Buddies")),
                    react_1.default.createElement(PlatformPressable_1.PlatformPressable, { style: [styles.tab, activeTab === 'chat' && styles.tabActive], onPress: () => setActiveTab('chat') },
                        react_1.default.createElement(vector_icons_1.Ionicons, { name: "chatbubbles", size: 20, color: activeTab === 'chat' ? '#007AFF' : '#6b7280' }),
                        react_1.default.createElement(react_native_1.Text, { style: [styles.tabText, activeTab === 'chat' && styles.tabTextActive] }, "Community"))))),
                selectedBuddy ? (
                // Direct chat with selected buddy
                react_1.default.createElement(react_native_1.View, { style: styles.chatContent },
                    react_1.default.createElement(GenericChatPanel_1.GenericChatPanel, { title: selectedBuddy.name, messages: messages, currentUserId: currentUserId, onSendMessage: handleSendMessage, placeholder: `Message ${selectedBuddy.name}...` }))) : activeTab === 'buddies' ? (
                // Buddy list
                react_1.default.createElement(react_native_1.FlatList, { data: buddies, renderItem: renderBuddy, keyExtractor: (item) => item.id, style: styles.buddyList, contentContainerStyle: styles.buddyListContent })) : (
                // Community chat
                react_1.default.createElement(react_native_1.View, { style: styles.chatContent },
                    react_1.default.createElement(GenericChatPanel_1.GenericChatPanel, { title: "Community Chat", messages: messages, currentUserId: currentUserId, onSendMessage: handleSendMessage, placeholder: "Chat with the community..." })))))));
}
const styles = react_native_1.StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
    drawer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '80%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 20,
    },
    handle: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    handleBar: {
        width: 36,
        height: 4,
        backgroundColor: '#d1d5db',
        borderRadius: 2,
    },
    content: {
        flex: 1,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        backgroundColor: '#fff',
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        gap: 6,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#007AFF',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#6b7280',
    },
    tabTextActive: {
        color: '#007AFF',
        fontWeight: '600',
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    chatHeaderInfo: {
        flex: 1,
    },
    chatHeaderName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1f2937',
    },
    chatHeaderStatus: {
        fontSize: 13,
        color: '#6b7280',
        textTransform: 'capitalize',
    },
    buddyList: {
        flex: 1,
    },
    buddyListContent: {
        paddingVertical: 8,
    },
    buddyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    buddyAvatar: {
        position: 'relative',
    },
    avatarImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    statusDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#fff',
    },
    buddyInfo: {
        flex: 1,
    },
    buddyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    buddyName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    lastMessage: {
        fontSize: 14,
        color: '#6b7280',
    },
    unreadBadge: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    unreadText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
    chatContent: {
        flex: 1,
    },
});
