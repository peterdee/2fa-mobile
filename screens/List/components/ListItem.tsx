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
import {
  Pressable,
  Text,
  View,
} from 'react-native';

import { SecretEntry } from '../../../types/models';
import styles from '../styles';
import Token from '../../../components/Token';
import { SPACER } from '../../../constants';

interface ListItemProps {
  index: number;
  listLength: number;
  secretEntry: SecretEntry;
}

const DIRECTIONS = {
  left: 'left',
  right: 'right',
};

const DISPOSITION_THRESHOLD = SPACER * 2;
const OFFSET = SPACER * 4;

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    index,
    listLength,
    secretEntry,
  } = props;

  const translateX = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      const value = event.translationX;
      const direction = value < translateX.value
        ? DIRECTIONS.left
        : DIRECTIONS.right;
      if (direction === DIRECTIONS.left && Math.abs(event.translationX) <= OFFSET) {
        console.log('moving left...');
        translateX.value = event.translationX;
      }
    },
    onEnd: (event) => {
      const value = event.translationX;
      if (Math.abs(value) < DISPOSITION_THRESHOLD) {
        console.log('return');
        translateX.value = withTiming(0);
      }
      if (Math.abs(value) >= DISPOSITION_THRESHOLD && Math.abs(value) < OFFSET) {
        console.log('auto-roll');
        translateX.value = withTiming(OFFSET * -1);
      }
    },
  });

  const itemStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateX.value,
    }],
  }));

  return (
    <View>
      <Pressable
        onPress={() => console.log('pressed')}
        style={styles.deleteButton}
      >
        <Text>
          Delete
        </Text>
      </Pressable>
      <PanGestureHandler
        activeOffsetX={0}
        activeOffsetY={[-10000, 0]}
        onGestureEvent={handleGesture}
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
    </View>
  );
}

export default memo(ListItem);
