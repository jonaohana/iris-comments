import { createContext, useContext } from 'react';

/** Colors the host app can pass to restyle the comment components. */
export interface CommentTheme {
  background: string;       // panel background
  surface: string;          // pills, buttons, inactive chips
  border: string;
  text: string;             // primary text
  textMuted: string;        // secondary text / timestamps / actions
  textFaint: string;        // placeholders / empty state
  accent: string;           // active sort, links, send icon, avatar fallback
  inputBackground: string;  // text input fill
}

export const DEFAULT_COMMENT_THEME: CommentTheme = {
  background: '#fff',
  surface: '#f0f0f0',
  border: '#e0e0e0',
  text: '#000',
  textMuted: '#666',
  textFaint: '#999',
  accent: '#007AFF',
  inputBackground: '#f8f8f8',
};

export const CommentThemeContext = createContext<CommentTheme>(DEFAULT_COMMENT_THEME);

export const useCommentTheme = () => useContext(CommentThemeContext);
