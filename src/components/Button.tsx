import {useIsFocused} from '@react-navigation/native';
import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  findNodeHandle,
  TouchableOpacity,
  NativeSyntheticEvent,
  TargetedEvent,
  FlexAlignType,
} from 'react-native';
import {COLORS} from '../styles';
import {FocusService, scaleSize} from '../utils';

type Props = Omit<
  React.ComponentProps<typeof TouchableOpacity>,
  'onBlur' | 'style' | 'hitSlop' | 'activeOpacity' | 'disabled'
> & {
  index: number;
  label: string;
  onPress?: () => void;
  width?: ViewStyle['width'];
  grow?: boolean;
  textAlignment?: FlexAlignType;
  canGoUp?: boolean;
  canGoDown?: boolean;
  canGoLeft?: boolean;
  canGoRight?: boolean;
};

export const Button = React.forwardRef<TouchableOpacity, Props>(
  (
    {
      index,
      label,
      onPress,
      textAlignment = 'center',
      width,
      grow,
      onFocus,
      nextFocusUp,
      nextFocusDown,
      nextFocusLeft,
      nextFocusRight,
      canGoUp = true,
      canGoDown = true,
      canGoLeft = true,
      canGoRight = true,
    },
    ref,
  ) => {
    const isViewFocused = useIsFocused();
    const [isFocused, setIsFocused] = useState(false);

    const onButtonFocus = useCallback(
      (e: NativeSyntheticEvent<TargetedEvent>) => {
        onFocus?.(e);
        setIsFocused(true);
      },
      [onFocus, setIsFocused],
    );

    const localRef = useRef<TouchableOpacity | null>(null);

    return (
      <View
        style={[
          width ? {width} : undefined,
          grow && {flexGrow: 1},
          {marginRight: scaleSize(16)},
        ]}>
        <TouchableOpacity
          hasTVPreferredFocus={
            isViewFocused &&
            (FocusService.instance?.focusedTag ===
              findNodeHandle(localRef.current) ||
              index === 0)
          }
          activeOpacity={1} // Do not want the opacity effect
          onFocus={onButtonFocus}
          onBlur={() => {
            setIsFocused(false);
            FocusService.instance?.clearFocusedTag();
          }}
          onPress={onPress}
          style={[
            styles.container,
            isFocused ? styles.focused : styles.solid,
            {alignItems: textAlignment},
          ]}
          ref={node => {
            localRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          nextFocusUp={
            (!canGoUp && findNodeHandle(localRef?.current)) || nextFocusUp
          }
          nextFocusDown={
            (!canGoDown && findNodeHandle(localRef?.current)) || nextFocusDown
          }
          nextFocusLeft={
            (!canGoLeft && findNodeHandle(localRef?.current)) || nextFocusLeft
          }
          nextFocusRight={
            (!canGoRight && findNodeHandle(localRef?.current)) || nextFocusRight
          }>
          <View style={styles.textContainer}>
            <Text style={{color: isFocused ? COLORS.shade6 : COLORS.shade1}}>
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

const REGULAR_HEIGHT = scaleSize(56);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleSize(20),
    height: REGULAR_HEIGHT,
    borderRadius: REGULAR_HEIGHT / 2,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  solid: {
    flexGrow: 1,
    backgroundColor: COLORS.primaryMidTone,
  },
  focused: {
    backgroundColor: COLORS.shade2,
  },
});

export default Button;
