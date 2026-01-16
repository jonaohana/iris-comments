"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformPressable = PlatformPressable;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
function PlatformPressable({ onPress, style, children, disabled = false, }) {
    // Use native Pressable for mobile
    if (react_native_1.Platform.OS !== 'web') {
        return (react_1.default.createElement(react_native_1.Pressable, { onPress: onPress, style: style, disabled: disabled }, children));
    }
    // For web, use a div with click handlers
    const computedStyle = typeof style === 'function' ? style({ pressed: false }) : style;
    // Flatten style array to a single object
    const flattenedStyle = react_native_1.StyleSheet.flatten(computedStyle);
    const handleClick = (e) => {
        e.preventDefault();
        if (!disabled && onPress) {
            onPress();
        }
    };
    return (react_1.default.createElement("div", { onClick: handleClick, style: {
            cursor: disabled ? 'default' : 'pointer',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            padding: 10,
            WebkitTapHighlightColor: 'transparent',
            ...flattenedStyle,
        } }, children));
}
