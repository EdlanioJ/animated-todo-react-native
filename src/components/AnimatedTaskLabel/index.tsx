import { Box, HStack, Text } from 'native-base';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// import { Container } from './styles';
interface Props {
  strikethrough: boolean;
  textColor: string;
  inactiveTextColor: string;
  onPress?: () => void;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimateHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedTaskLabel: React.FC<Props> = ({
  inactiveTextColor,
  strikethrough,
  textColor,
  children,
  onPress,
}) => {
  const hstackOffset = useSharedValue(0);
  const hstackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hstackOffset.value }],
    }),
    [strikethrough]
  );
  const textColorProgress = useSharedValue(0);
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      ),
    }),
    [strikethrough, textColor, inactiveTextColor]
  );

  const strikethroughWidth = useSharedValue(0);
  const strikethroughAnimatedStyles = useAnimatedStyle(
    () => ({
      width: `${strikethroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      ),
    }),
    [strikethrough, textColor, inactiveTextColor]
  );

  useEffect(() => {
    const easing = Easing.out(Easing.quad);

    if (strikethrough) {
      hstackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );

      strikethroughWidth.value = withTiming(1, { duration: 400, easing });
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, { duration: 400, easing })
      );
    } else {
      strikethroughWidth.value = withTiming(0, { duration: 400, easing });
      textColorProgress.value = withTiming(0, { duration: 400, easing });
    }
  });
  return (
    <Pressable onPress={onPress}>
      <AnimateHStack alignItems="center" style={[hstackAnimatedStyles]}>
        <AnimatedText
          fontSize={19}
          noOfLines={1}
          isTruncated
          px={1}
          style={[textColorAnimatedStyles]}
        >
          {children}
        </AnimatedText>
        <AnimatedBox
          position="absolute"
          borderBottomWidth={1}
          style={[strikethroughAnimatedStyles]}
        />
      </AnimateHStack>
    </Pressable>
  );
};

export default AnimatedTaskLabel;
