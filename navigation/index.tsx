import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Pressable } from 'react-native';

import {
  BottomBarIconProps,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types/navigation';
import CodeScanner from '../screens/CodeScanner';
import { COLORS, SPACER, SPACER_HALF } from '../constants';
import LinkingConfiguration from './LinkingConfiguration';
import List from '../screens/List';
import ListOptionsModal from '../screens/ListOptionsModal';
import LogOut from '../screens/LogOut';
import NotFound from '../screens/NotFound';
import PINCode from '../screens/PINCode';
import Profile from '../screens/Profile';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

function BottomIcon({ color, name }: BottomBarIconProps): React.ReactElement {
  return (
    <Ionicons
      color={color}
      name={name}
      size={SPACER + SPACER_HALF + (SPACER_HALF / 2)}
      style={{ marginBottom: -3 }}
    />
  );
}

function HeaderMenu({ navigation }: RootTabScreenProps<'List'>): React.ReactElement {
  return (
    <Pressable
      onPress={(): void => navigation.navigate('Modal')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Ionicons
        name="ellipsis-vertical"
        size={24}
        color={COLORS.text}
        style={{ marginRight: SPACER }}
      />
    </Pressable>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(): React.ReactElement {
  return (
    <BottomTab.Navigator
      initialRouteName="List"
      screenOptions={{
        tabBarActiveTintColor: COLORS.accent,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        component={List}
        name="List"
        options={(props: RootTabScreenProps<'List'>): BottomTabNavigationOptions => ({
          headerRight: (): React.ReactElement => HeaderMenu(props),
          tabBarIcon: ({ color }): React.ReactElement => BottomIcon({ color, name: 'md-list' }),
          title: 'List',
        })}
      />
      <BottomTab.Screen
        component={CodeScanner}
        name="CodeScanner"
        options={{
          tabBarIcon: ({ color }): React.ReactElement => BottomIcon({ color, name: 'qr-code' }),
          title: 'Code Scanner',
        }}
      />
      <BottomTab.Screen
        component={Profile}
        name="Profile"
        options={{
          tabBarIcon: ({ color }): React.ReactElement => BottomIcon({
            color,
            name: 'person-outline',
          }),
          title: 'Profile',
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation(): React.ReactElement {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator initialRouteName="PINCode">
        <Stack.Screen
          component={LogOut}
          name="LogOut"
          options={{ headerShown: false }}
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            component={ListOptionsModal}
            name="Modal"
            options={{ title: 'List Options' }}
          />
        </Stack.Group>
        <Stack.Screen
          component={NotFound}
          name="NotFound"
          options={{ title: 'Oops!' }}
        />
        <Stack.Screen
          component={PINCode}
          name="PINCode"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={BottomTabNavigator}
          name="Root"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignIn}
          name="SignIn"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignUp}
          name="SignUp"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
