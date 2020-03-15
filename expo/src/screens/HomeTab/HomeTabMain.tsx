import React from 'react';
import { AppText } from '@screens/Shared';
import { StatusBar } from 'react-native';

export const HomeTabMain = (): JSX.Element => (
  <>
    <StatusBar barStyle={'dark-content'} />
    <AppText.Body>Home tab</AppText.Body>
  </>
);
