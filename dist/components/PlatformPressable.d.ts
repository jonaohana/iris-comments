import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
interface PlatformPressableProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle> | ((state: {
        pressed: boolean;
    }) => StyleProp<ViewStyle>);
    children: React.ReactNode;
    disabled?: boolean;
}
export declare function PlatformPressable({ onPress, style, children, disabled, }: PlatformPressableProps): React.JSX.Element;
export {};
//# sourceMappingURL=PlatformPressable.d.ts.map