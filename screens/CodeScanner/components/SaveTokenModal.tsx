import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import generateOTP from '../../../utilities/otp';
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
      <Text style={styles.modalText}>
        { `Secret: ${generateOTP(token.split('secret=')[1].split('&')[0])}` }
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
