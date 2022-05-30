import React, { memo } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import { SecretEntry } from '../../../types/models';
import styles from '../styles';
import Token from '../../../components/Token';

interface ListItemProps {
  index: number;
  listLength: number;
  secretEntry: SecretEntry;
}

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    index,
    listLength,
    secretEntry,
  } = props;

  const translateX = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      translateX.value = withTiming(0);
    },
  });

  const itemStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateX.value,
    }],
  }));

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      activeOffsetX={0}
      activeOffsetY={[-10000, 0]}
    >
      <Animated.View style={itemStyle}>
        <Token
          key={secretEntry.id}
          secretEntry={secretEntry}
          wrapStyles={{
            ...styles.tokenWrap,
            borderBottomWidth: index === listLength - 1
              ? 0
              : 1,
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

export default memo(ListItem);
