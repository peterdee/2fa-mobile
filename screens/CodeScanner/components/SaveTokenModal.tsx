import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface SaveTokenModalProps {
  handleCancel: () => void;
  handleSaveToken: () => Promise<void>;
  showSaveTokenModal: boolean;
  token: string;
}

function SaveTokenModal(props: SaveTokenModalProps): React.ReactElement {
  const {
    handleCancel,
    handleSaveToken,
    showSaveTokenModal,
    token,
  } = props;

  return (
    <ModalWrap isVisible={showSaveTokenModal}>
      <Text style={styles.modalText}>
        { `Token: ${token}` }
      </Text>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.negative,
          marginTop: SPACER,
        }}
        onPress={handleSaveToken}
        text="Save"
      />
      <WideButton
        buttonStyle={{
          marginTop: SPACER * 2,
        }}
        onPress={handleCancel}
        text="Cancel"
      />
    </ModalWrap>
  );
}

export default memo(SaveTokenModal);
