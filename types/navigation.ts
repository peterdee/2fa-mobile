import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

export interface BottomBarIconProps {
  color?: string;
  focused?: boolean;
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
}

export type RootTabParamList = {
  CodeScanner: undefined;
  List: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  LogOut: undefined;
  Modal: undefined;
  NotFound: undefined;
  PINCode: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabScreenProps<
  Screen extends keyof RootTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
