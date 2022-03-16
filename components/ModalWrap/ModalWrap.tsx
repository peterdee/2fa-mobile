import React, { memo } from 'react';
import { Modal, View } from 'react-native';

import styles from './styles';

interface ModalWrapProps {
  children: React.ReactChild | React.ReactChild[];
  isVisible: boolean;
}

function ModalWrap(props: ModalWrapProps): React.ReactElement {
  const {
    children,
    isVisible,
  } = props;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
    >
      <View style={styles.centered}>
        { children }
      </View>
    </Modal>
  );
}

export default memo(ModalWrap);
