import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Loader from '../../../components/Loader';
import LogoutModal from './LogoutModal';
import { RootStackParamList } from '../../../types/navigation';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface ProfileLayoutProps {
  handleLogout: (full: boolean, preserveData: boolean) => Promise<void>;
  handleNavigation: (destination: keyof RootStackParamList) => void;
  isSignedIn: boolean;
  loading: boolean;
  login: string;
  showLogoutModal: boolean;
  toggleLogoutModal: () => void;
}

function ProfileLayout(props: ProfileLayoutProps): React.ReactElement {
  const {
    handleLogout,
    handleNavigation,
    isSignedIn,
    loading,
    login,
    showLogoutModal,
    toggleLogoutModal,
  } = props;

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && isSignedIn && (
        <>
          <LogoutModal
            handleClose={toggleLogoutModal}
            handleLogout={handleLogout}
            showModal={showLogoutModal}
          />
          <Text>
            { login }
          </Text>
          <WideButton
            buttonStyle={{
              backgroundColor: COLORS.negative,
              marginTop: SPACER * 2,
            }}
            onPress={toggleLogoutModal}
            text="Log out"
          />
        </>
      ) }
      { !loading && !isSignedIn && (
        <>
          <WideButton
            onPress={(): void => handleNavigation('SignIn')}
            text="Sign in"
          />
          <WideButton
            buttonStyle={{
              marginTop: SPACER * 2,
            }}
            onPress={(): void => handleNavigation('SignUp')}
            text="Sign up"
          />
        </>
      ) }
    </View>
  );
}

export default memo(ProfileLayout);
