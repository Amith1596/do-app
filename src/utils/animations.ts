import { useRef, useCallback, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * Press scale animation — subtle spring scale-down on press, spring back on release.
 * Wrap the card content in <Animated.View style={{ transform: [{ scale }] }}>.
 */
export function usePressAnimation(pressedScale = 0.97) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: pressedScale,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scale, pressedScale]);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scale]);

  return { scale, onPressIn, onPressOut };
}

/**
 * Entrance animation — fade in + slide up. Triggers on key change.
 * Returns { opacity, translateY } to apply via Animated.View.
 */
export function useEntranceAnimation(triggerKey: string | number | undefined) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(14);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        speed: 14,
        bounciness: 4,
      }),
    ]).start();
  }, [triggerKey, opacity, translateY]);

  return { opacity, translateY };
}
