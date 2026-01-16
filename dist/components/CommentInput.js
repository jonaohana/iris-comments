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
exports.CommentInput = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const vector_icons_1 = require("@expo/vector-icons");
const CommentInput = ({ onSubmit, placeholder = 'Write a comment...', autoFocus = false, initialValue = '', onCancel, showCancel = false, }) => {
    const [text, setText] = (0, react_1.useState)(initialValue);
    const handleSubmit = () => {
        if (text.trim()) {
            onSubmit(text.trim());
            setText('');
        }
    };
    const handleCancel = () => {
        setText('');
        onCancel?.();
    };
    return (react_1.default.createElement(react_native_1.KeyboardAvoidingView, { behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : 'height', style: styles.container },
        react_1.default.createElement(react_native_1.View, { style: styles.inputContainer },
            react_1.default.createElement(react_native_1.TextInput, { style: styles.input, value: text, onChangeText: setText, placeholder: placeholder, placeholderTextColor: "#999", multiline: true, maxLength: 1000, autoFocus: autoFocus }),
            react_1.default.createElement(react_native_1.View, { style: styles.buttonContainer },
                showCancel && (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleCancel, style: [styles.button, styles.cancelButton] },
                    react_1.default.createElement(vector_icons_1.Ionicons, { name: "close", size: 20, color: "#666" }))),
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleSubmit, disabled: !text.trim(), style: [
                        styles.button,
                        styles.sendButton,
                        !text.trim() && styles.sendButtonDisabled,
                    ] },
                    react_1.default.createElement(vector_icons_1.Ionicons, { name: "send", size: 18, color: text.trim() ? '#007AFF' : '#ccc' }))))));
};
exports.CommentInput = CommentInput;
const styles = react_native_1.StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 8,
        minHeight: 50,
    },
    input: {
        flex: 1,
        minHeight: 36,
        maxHeight: 100,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        paddingTop: 8,
        fontSize: 15,
        backgroundColor: '#f8f8f8',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 8,
        gap: 4,
    },
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    sendButton: {
        backgroundColor: '#f0f0f0',
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
});
