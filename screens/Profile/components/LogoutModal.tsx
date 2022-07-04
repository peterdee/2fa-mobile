import React, {
  memo,
  useCallback,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import Switch from '../../../components/Switch';
import WideButton from '../../../components/WideButton';

interface LogoutModalProps {
  handleClose: () => void;
  handleLogout: (full: boolean, preserveData: boolean) => Promise<void>;
  showModal: boolean;
}

function LogoutModal(props: LogoutModalProps): React.ReactElement {
  const {
    handleClose,
    handleLogout,
    showModal,
  } = props;

  const [switchValue, setSwitchValue] = useState<boolean>(true);

  const handleLogoutPress = useCallback(
    (full: boolean): Promise<void> => handleLogout(full, switchValue),
    [switchValue],
  );

  return (
    <ModalWrap isVisible={showModal}>
      <View style={styles.switchRow}>
        <Text style={styles.modalText}>
          Preserve entries on device
        </Text>
        <Switch
          handleChange={setSwitchValue}
          value={switchValue}
        />
      </View>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.negative,
          marginTop: SPACER * 2,
        }}
        onPress={(): Promise<void> => handleLogoutPress(false)}
        text="Log out from this device"
      />
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.negative,
          marginTop: SPACER * 2,
        }}
        onPress={(): Promise<void> => handleLogoutPress(true)}
        text="Log out on all devices"
      />
      <WideButton
        buttonStyle={{
          marginTop: SPACER * 2,
        }}
        onPress={handleClose}
        text="Cancel"
      />
    </ModalWrap>
  );
}

export default memo(LogoutModal);
