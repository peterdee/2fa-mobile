import React, { memo } from 'react';
import { Text, View } from 'react-native';

import ChangePasswordModal from './ChangePasswordModal';
import { COLORS, SPACER } from '../../../constants';
import DeleteProfileModal from './DeleteProfileModal';
import LinkButton from '../../../components/LinkButton';
import Loader from '../../../components/Loader';
import LogoutModal from './LogoutModal';
import { RootStackParamList } from '../../../types/navigation';
import styles from '../styles';
import WideButton from '../../../components/WideButton';
import Switch from '../../../components/Switch';

interface ProfileLayoutProps {
  handleDeleteProfile: () => Promise<void>;
  handleLogout: (full: boolean, preserveData: boolean) => Promise<void>;
  handleNavigation: (destination: keyof RootStackParamList) => void;
  isSignedIn: boolean;
  loading: boolean;
  login: string;
  showChangePasswordModal: boolean;
  showDeleteProfileModal: boolean;
  showLogoutModal: boolean;
  toggleChangePasswordModal: () => void;
  toggleDeleteProfileModal: () => void;
  toggleLogoutModal: () => void;
}

function ProfileLayout(props: ProfileLayoutProps): React.ReactElement {
  const {
    handleDeleteProfile,
    handleLogout,
    handleNavigation,
    isSignedIn,
    loading,
    login,
    showChangePasswordModal,
    showDeleteProfileModal,
    showLogoutModal,
    toggleChangePasswordModal,
    toggleDeleteProfileModal,
    toggleLogoutModal,
  } = props;

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && isSignedIn && (
        <>
          <ChangePasswordModal
            handleClose={toggleChangePasswordModal}
            handleNavigation={handleNavigation}
            showModal={showChangePasswordModal}
          />
          <DeleteProfileModal
            handleClose={toggleDeleteProfileModal}
            handleDeleteProfile={handleDeleteProfile}
            showModal={showDeleteProfileModal}
          />
          <LogoutModal
            handleClose={toggleLogoutModal}
            handleLogout={handleLogout}
            showModal={showLogoutModal}
          />
          <Text>
            { login }
          </Text>
          <View style={styles.switchRow}>
            <Text>
              Require PIN
            </Text>
            <Switch
              handleChange={(): void => console.log('PIN switch')}
              value
            />
          </View>
          <WideButton
            buttonStyle={{
              marginTop: SPACER * 2,
            }}
            onPress={toggleChangePasswordModal}
            text="Change password"
          />
          <WideButton
            buttonStyle={{
              backgroundColor: COLORS.negative,
              marginTop: SPACER * 2,
            }}
            onPress={(): void => console.log('delete all entries')}
            text="Delete all entries ()"
          />
          <WideButton
            buttonStyle={{
              backgroundColor: COLORS.negative,
              marginTop: SPACER * 2,
            }}
            onPress={toggleLogoutModal}
            text="Log out"
          />
          <LinkButton
            buttonStyle={{
              marginTop: SPACER * 2,
            }}
            onPress={toggleDeleteProfileModal}
            text="Delete profile"
            textStyle={{
              color: COLORS.negative,
            }}
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
