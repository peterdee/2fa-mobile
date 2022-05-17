import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';

import { COLORS } from '../constants';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PINCode from '../screens/PINCode';
import List from '../screens/List';
import CodeScanner from '../screens/CodeScanner';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types/navigation';
import LinkingConfiguration from './LinkingConfiguration';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}): React.ReactElement {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(): React.ReactElement {
  return (
    <BottomTab.Navigator
      initialRouteName="List"
      screenOptions={{
        tabBarActiveTintColor: COLORS.accent,
      }}
    >
      <BottomTab.Screen
        name="List"
        component={List}
        options={({ navigation }: RootTabScreenProps<'List'>) => ({
          title: 'List',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
        })}
      />
      <BottomTab.Screen
        name="CodeScanner"
        component={CodeScanner}
        options={{
          title: 'Code Scanner',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
