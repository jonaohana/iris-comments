/** Colors the host app can pass to restyle the comment components. */
export interface CommentTheme {
    background: string;
    surface: string;
    border: string;
    text: string;
    textMuted: string;
    textFaint: string;
    accent: string;
    inputBackground: string;
}
export declare const DEFAULT_COMMENT_THEME: CommentTheme;
export declare const CommentThemeContext: import("react").Context<CommentTheme>;
export declare const useCommentTheme: () => CommentTheme;
//# sourceMappingURL=theme.d.ts.map