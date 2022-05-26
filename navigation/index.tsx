import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
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
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PINCode from '../screens/PINCode';

function CodeScannerIcon({ color }: BottomBarIconProps): React.ReactElement {
  return (
    <Ionicons
      color={color}
      name="qr-code"
      size={SPACER + SPACER_HALF + (SPACER_HALF / 2)}
      style={{ marginBottom: -3 }}
    />
  );
}

function ListIcon({ color }: BottomBarIconProps): React.ReactElement {
  return (
    <FontAwesome5
      color={color}
      name="list-ul"
      size={SPACER + SPACER_HALF + (SPACER_HALF / 2)}
      style={{ marginBottom: -3 }}
    />
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
        name="List"
        component={List}
        options={({ navigation }: RootTabScreenProps<'List'>) => ({
          title: 'List',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={24}
                color={COLORS.text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => ListIcon({ color }),
        })}
      />
      <BottomTab.Screen
        name="CodeScanner"
        component={CodeScanner}
        options={{
          title: 'Code Scanner',
          tabBarIcon: ({ color }) => CodeScannerIcon({ color }),
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
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Screen name="PINCode" component={PINCode} options={{ headerShown: false }} />
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
