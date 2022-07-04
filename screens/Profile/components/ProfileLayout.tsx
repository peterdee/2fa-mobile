import React, { memo } from 'react';
import { Text, View } from 'react-native';

import Loader from '../../../components/Loader';
import LogoutModal from './LogoutModal';
import WideButton from '../../../components/WideButton';
import { RootStackParamList } from '../../../types/navigation';
import styles from '../styles';

interface ProfileLayoutProps {
  handleLogout: (full?: boolean) => Promise<void>;
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
            onPress={toggleLogoutModal}
            text="Logout"
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
            onPress={(): void => handleNavigation('SignUp')}
            text="Sign up"
          />
        </>
      ) }
    </View>
  );
}

export default memo(ProfileLayout);
