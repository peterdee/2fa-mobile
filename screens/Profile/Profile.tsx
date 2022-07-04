import React, {
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { deleteValue, getValue, KEYS } from '../../utilities/storage';
import ProfileLayout from './components/ProfileLayout';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../../types/navigation';

function Profile({ navigation }: RootStackScreenProps<'Root'>): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [login, setLogin] = useState<string>('');
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);

  const isSignedIn = useMemo(
    (): boolean => !!(login && token && userId),
    [
      login,
      token,
      userId,
    ],
  );

  useEffect(
    (): void => {
      async function getValues(): Promise<void> {
        const [loginData, tokenData, userIdData] = await Promise.all([
          getValue<string>(KEYS.login),
          getValue<string>(KEYS.token),
          getValue<number>(KEYS.userId),
        ]);
        setLogin(loginData || '');
        setToken(tokenData || '');
        setUserId(userIdData);

        return setLoading(false);
      }
      getValues();
    },
    [],
  );

  const handleLogout = async (full?: boolean) => {
    setLoading(true);
    setShowLogoutModal(false);

    // artificial delay to show the loader
    await new Promise((resolve): void => {
      setTimeout(resolve, 500);
    });

    if (full) {
      // TODO: send a request for a full logout
    }

    await Promise.all([
      deleteValue(KEYS.login),
      deleteValue(KEYS.token),
      deleteValue(KEYS.userId),
    ]);

    setLogin('');
    setToken('');
    setUserId(null);

    return setLoading(false);
  };

  const handleNavigation = (
    destination: keyof RootStackParamList,
  ): void => navigation.push(destination);

  const toggleLogoutModal = (): void => setShowLogoutModal(
    (state: boolean): boolean => !state,
  );

  return (
    <ProfileLayout
      handleLogout={handleLogout}
      handleNavigation={handleNavigation}
      isSignedIn={isSignedIn}
      loading={loading}
      login={login}
      showLogoutModal={showLogoutModal}
      toggleLogoutModal={toggleLogoutModal}
    />
  );
}

export default memo(Profile);
