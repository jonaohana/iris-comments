import React from 'react';
import { Pressable, Platform, ViewStyle, StyleProp, StyleSheet } from 'react-native';

interface PlatformPressableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  children: React.ReactNode;
  disabled?: boolean;
}

export function PlatformPressable({
  onPress,
  style,
  children,
  disabled = false,
}: PlatformPressableProps) {
  // Use native Pressable for mobile
  if (Platform.OS !== 'web') {
    return (
      <Pressable onPress={onPress} style={style} disabled={disabled}>
        {children}
      </Pressable>
    );
  }

  // For web, use a div with click handlers
  const computedStyle = typeof style === 'function' ? style({ pressed: false }) : style;
  
  // Flatten style array to a single object
  const flattenedStyle = StyleSheet.flatten(computedStyle);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        padding: 10,
        WebkitTapHighlightColor: 'transparent',
        ...(flattenedStyle as any),
      }}
    >
      {children}
    </div>
  );
}
