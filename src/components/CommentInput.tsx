import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommentInputProps } from '../types';
import { useCommentTheme } from '../theme';

export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  placeholder = 'Write a comment...',
  autoFocus = false,
  initialValue = '',
  onCancel,
  showCancel = false,
}) => {
  const t = useCommentTheme();
  const [text, setText] = useState(initialValue);

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { borderTopColor: t.border, backgroundColor: t.background }]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { borderColor: t.border, backgroundColor: t.inputBackground, color: t.text }]}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={t.textFaint}
          multiline
          maxLength={1000}
          autoFocus={autoFocus}
        />
        <View style={styles.buttonContainer}>
          {showCancel && (
            <TouchableOpacity
              onPress={handleCancel}
              style={[styles.button, { backgroundColor: t.surface }]}
            >
              <Ionicons name="close" size={20} color={t.textMuted} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!text.trim()}
            style={[
              styles.button,
              { backgroundColor: t.surface },
              !text.trim() && styles.sendButtonDisabled,
            ]}
          >
            <Ionicons
              name="send"
              size={18}
              color={text.trim() ? t.accent : t.textFaint}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
