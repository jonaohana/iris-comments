"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommentTheme = exports.CommentThemeContext = exports.DEFAULT_COMMENT_THEME = void 0;
const react_1 = require("react");
exports.DEFAULT_COMMENT_THEME = {
    background: '#fff',
    surface: '#f0f0f0',
    border: '#e0e0e0',
    text: '#000',
    textMuted: '#666',
    textFaint: '#999',
    accent: '#007AFF',
    inputBackground: '#f8f8f8',
};
exports.CommentThemeContext = (0, react_1.createContext)(exports.DEFAULT_COMMENT_THEME);
const useCommentTheme = () => (0, react_1.useContext)(exports.CommentThemeContext);
exports.useCommentTheme = useCommentTheme;
