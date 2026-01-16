"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatPanel = ChatPanel;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const GenericChatPanel_1 = require("./GenericChatPanel");
function ChatPanel({ messages, currentUserId, onSendMessage }) {
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(GenericChatPanel_1.GenericChatPanel, { title: "Trade Chat", messages: messages, currentUserId: currentUserId, onSendMessage: onSendMessage, placeholder: "Discuss the trade..." })));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
});
