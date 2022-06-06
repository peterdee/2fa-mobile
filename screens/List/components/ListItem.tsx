import React, { memo, useState } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { Pressable, View } from 'react-native';

import DeleteEntryModal from './DeleteEntryModal';
import EditEntryModal from './EditEntryModal';
import { SecretEntry } from '../../../types/models';
import { COLORS, SPACER } from '../../../constants';
import styles from '../styles';
import Token from '../../../components/Token';

interface ListItemProps {
  handleDelete: (id: string) => Promise<void>;
  secretEntry: SecretEntry;
}

const DIRECTIONS = {
  left: 'left',
  right: 'right',
};

const DISPOSITION_THRESHOLD = SPACER * 7;
const OFFSET = SPACER * 14;

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    handleDelete,
    secretEntry,
  } = props;

  const [accountName, setAccountName] = useState<string>(secretEntry.accountName || '');
  const [issuer, setIssuer] = useState<string>(secretEntry.issuer || '');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const direction = useSharedValue(DIRECTIONS.left);
  const previousEventTranslationX = useSharedValue(0);
  const swipeLock = useSharedValue(false);
  const translateX = useSharedValue(0);

  const handleDeleteEntry = (): Promise<void> => {
    setShowDeleteModal(false);
    return handleDelete(secretEntry.id);
  };

  const handleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event): void => {
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
    onEnd: (event): void => {
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

  const handleInput = (name: string, value: string): void => {
    if (name === 'accountName') {
      setAccountName(value);
    }
    if (name === 'issuer') {
      setIssuer(value);
    }
  };

  const itemStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateX.value,
    }],
  }));

  return (
    <View>
      <DeleteEntryModal
        handleClose={(): void => setShowDeleteModal(false)}
        handleDelete={handleDeleteEntry}
        secretEntry={secretEntry}
        showDeleteEntryModal={showDeleteModal}
      />
      <EditEntryModal
        accountName={accountName}
        handleClose={(): void => setShowEditModal(false)}
        handleEdit={async (): Promise<void> => console.log('save')}
        handleInput={handleInput}
        issuer={issuer}
        secretEntry={secretEntry}
        showEditEntryModal={showEditModal}
      />
      <Pressable
        onPress={(): void => setShowEditModal(true)}
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
        onPress={(): void => setShowDeleteModal(true)}
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
    </View>
  );
}

export default memo(ListItem);
