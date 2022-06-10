import React, { memo } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, Pressable } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import { SecretEntry } from '../../../types/models';
import styles from '../styles';
import Token from '../../../components/Token';

interface ListItemProps {
  secretEntry: SecretEntry;
  showDeleteModal: (id: string) => void;
  showEditModal: (id: string) => void;
}

const DIRECTIONS = {
  left: 'left',
  right: 'right',
};

const DISPOSITION_THRESHOLD = SPACER * 7;
const OFFSET = SPACER * 14;

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    secretEntry,
    showDeleteModal,
    showEditModal,
  } = props;

  const direction = useSharedValue(DIRECTIONS.left);
  const previousEventTranslationX = useSharedValue(0);
  const swipeLock = useSharedValue(false);
  const translateX = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (
      event: GestureEventPayload & PanGestureHandlerEventPayload,
    ): void => {
      // horizontal axis shift value
      const eventTranslationX = event.translationX;

      // determine shift direction based on the previous event value
      direction.value = eventTranslationX < previousEventTranslationX.value
        ? DIRECTIONS.left
        : DIRECTIONS.right;

      // update previous event value
      previousEventTranslationX.value = eventTranslationX;

      // swiping not locked
      if (Math.abs(eventTranslationX) <= OFFSET
        && eventTranslationX <= 0
        && !swipeLock.value) {
        translateX.value = eventTranslationX;
      }

      // swiping locked
      if (eventTranslationX >= 0
        && eventTranslationX <= OFFSET
        && swipeLock.value) {
        translateX.value = eventTranslationX - OFFSET;
      }
    },
    onEnd: (
      event: GestureEventPayload & PanGestureHandlerEventPayload,
    ): void => {
      // set previous event value back to zero
      previousEventTranslationX.value = 0;

      // horizontal axis shift value
      const eventTranslationX = event.translationX;

      // swiping not locked
      if (!swipeLock.value) {
        if (Math.abs(translateX.value) <= DISPOSITION_THRESHOLD) {
          swipeLock.value = false;
          translateX.value = withTiming(0);
        } else {
          swipeLock.value = true;
          translateX.value = withTiming(OFFSET * -1);
        }
      }

      // swiping locked
      if (swipeLock.value) {
        if (eventTranslationX <= DISPOSITION_THRESHOLD) {
          swipeLock.value = true;
          translateX.value = withTiming(OFFSET * -1);
        } else {
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
    <>
      <Pressable
        onPress={(): void => showEditModal(secretEntry.id)}
        style={{
          ...styles.editButton,
          height: DISPOSITION_THRESHOLD,
          width: DISPOSITION_THRESHOLD,
        }}
      >
        <MaterialCommunityIcons
          color={COLORS.textInverted}
          name="comment-edit-outline"
          size={SPACER * 2}
        />
      </Pressable>
      <Pressable
        onPress={(): void => showDeleteModal(secretEntry.id)}
        style={{
          ...styles.deleteButton,
          height: DISPOSITION_THRESHOLD,
          width: DISPOSITION_THRESHOLD,
        }}
      >
        <MaterialCommunityIcons
          color={COLORS.textInverted}
          name="delete-outline"
          size={SPACER * 2}
        />
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
            wrapStyles={styles.tokenWrap}
          />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}

export default memo(ListItem);
