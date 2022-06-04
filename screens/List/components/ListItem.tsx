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
import { SPACER } from '../../../constants';
import styles from '../styles';
import Token from '../../../components/Token';

interface ListItemProps {
  handleDelete: (id: string) => void;
  index: number;
  listLength: number;
  secretEntry: SecretEntry;
}

const DIRECTIONS = {
  left: 'left',
  right: 'right',
};

const DISPOSITION_THRESHOLD = SPACER * 3;
const OFFSET = SPACER * 6;

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    handleDelete,
    index,
    listLength,
    secretEntry,
  } = props;

  const direction = useSharedValue(DIRECTIONS.left);
  const previousEventTranslationX = useSharedValue(0);
  const swipeLock = useSharedValue(false);
  const translateX = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      // horizontal axis shift value
      const eventTranslationX = Math.abs(event.translationX) > OFFSET
        ? translateX.value
        : event.translationX;

      // determine shift direction based on the previous event value
      direction.value = eventTranslationX < previousEventTranslationX.value
        ? DIRECTIONS.left
        : DIRECTIONS.right;

      // update previous event value
      previousEventTranslationX.value = eventTranslationX;

      // handle swipe to the left when swipe is not locked
      if (direction.value === DIRECTIONS.left
        && Math.abs(eventTranslationX) <= OFFSET
        && eventTranslationX < 0
        && !swipeLock.value) {
        translateX.value = eventTranslationX;
      }

      // handle swipe to the left when swipe is locked
      if (direction.value === DIRECTIONS.left
        && swipeLock.value
        && eventTranslationX <= OFFSET
        && eventTranslationX > 0) {
        translateX.value = eventTranslationX - OFFSET;
      }

      // handle swipe to the right when swipe is not locked
      if (direction.value === DIRECTIONS.right
        && eventTranslationX < 0
        && Math.abs(eventTranslationX) <= OFFSET
        && !swipeLock.value) {
        translateX.value = eventTranslationX;
      }

      // handle swipe to the right when swipe is locked
      if (direction.value === DIRECTIONS.right
        && swipeLock.value) {
        const shiftValue = eventTranslationX - OFFSET;
        if (shiftValue < 0 && Math.abs(shiftValue) <= OFFSET) {
          translateX.value = shiftValue;
        }
      }
    },
    onEnd: (event) => {
      // set previous event value back to zero
      previousEventTranslationX.value = 0;

      // horizontal axis shift value
      const eventTranslationX = event.translationX;

      // TODO: fix the issue with returning
      console.log(direction.value, swipeLock.value, eventTranslationX, translateX.value);

      // swipe in any direction, not locked
      if (!swipeLock.value) {
        if ((direction.value === DIRECTIONS.right
          && eventTranslationX < 0)
          || (direction.value === DIRECTIONS.left
          && Math.abs(eventTranslationX) < DISPOSITION_THRESHOLD)) {
          swipeLock.value = false;
          translateX.value = withTiming(0);
        }
        if ((direction.value === DIRECTIONS.right
          && eventTranslationX < 0)
          || (direction.value === DIRECTIONS.left
          && Math.abs(eventTranslationX) >= DISPOSITION_THRESHOLD)) {
          swipeLock.value = true;
          translateX.value = withTiming(OFFSET * -1);
        }
      }

      // if swipe is locked
      if (swipeLock.value) {
        if ((direction.value === DIRECTIONS.right
          && eventTranslationX < DISPOSITION_THRESHOLD)
          || (direction.value === DIRECTIONS.left
          && OFFSET - eventTranslationX >= DISPOSITION_THRESHOLD)) {
          swipeLock.value = true;
          translateX.value = withTiming(OFFSET * -1);
        }
        if ((direction.value === DIRECTIONS.right
          && eventTranslationX >= DISPOSITION_THRESHOLD)
          || (direction.value === DIRECTIONS.left
          && OFFSET - eventTranslationX < DISPOSITION_THRESHOLD)) {
          swipeLock.value = false;
          translateX.value = withTiming(0);
        }
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
        onPress={() => handleDelete(secretEntry.id)}
        style={{
          ...styles.deleteButton,
          height: OFFSET,
          width: OFFSET,
        }}
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
