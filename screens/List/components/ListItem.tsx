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

  const previousEventTranslationX = useSharedValue(0);
  const translateX = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      // horizontal axis shift value
      const eventTranslationX = event.translationX;

      // determine shift direction based on the previous event value
      const direction = eventTranslationX < previousEventTranslationX.value
        ? DIRECTIONS.left
        : DIRECTIONS.right;

      // update previous event value
      previousEventTranslationX.value = eventTranslationX;

      console.log('moving', direction, eventTranslationX, translateX.value);

      // handle swipe to the left
      if (direction === DIRECTIONS.left
        && Math.abs(eventTranslationX) <= OFFSET
        && Math.abs(translateX.value) <= OFFSET) {
        translateX.value = eventTranslationX;
      }

      // handle swipe to the right
      if (direction === DIRECTIONS.right
        && translateX.value < 0) {
        console.log('right');
        // const rightShift = translateX.value + value;
        // if (rightShift < 0) {
        //   console.log('right...', rightShift);
        //   translateX.value = rightShift;
        // }
      }
    },
    onEnd: (event) => {
      previousEventTranslationX.value = 0;
      const value = event.translationX;
      console.log('end event', value, translateX.value);
      if (Math.abs(value) < DISPOSITION_THRESHOLD) {
        console.log('return');
        translateX.value = withTiming(0);
      }
      if (Math.abs(value) >= DISPOSITION_THRESHOLD) {
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
