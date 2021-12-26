import { Box } from 'native-base';
import React from 'react';
import { Dimensions, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { makeStyledComponent } from '../../utils/styled';

const StyledView = makeStyledComponent(Animated.View);

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  backView?: React.ReactNode;
  onSwipeLeft?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;

const SwipeableView: React.FC<Props> = ({
  backView,
  children,
  onSwipeLeft,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        translateX.value = Math.max(-128, Math.min(0, event.translationX));
      },
      onEnd: () => {
        const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD;
        if (shouldBeDismissed) {
          translateX.value = withTiming(-SCREEN_WIDTH);
          onSwipeLeft && runOnJS(onSwipeLeft)();
        } else {
          translateX.value = withTiming(0);
        }
      },
    });
  const facadeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <StyledView w="full">
      {backView && (
        <Box position="absolute" left={0} right={0} top={0} bottom={0}>
          {backView}
        </Box>
      )}
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={onGestureEvent}
      >
        <StyledView style={facadeStyle}>{children}</StyledView>
      </PanGestureHandler>
    </StyledView>
  );
};

export default SwipeableView;
