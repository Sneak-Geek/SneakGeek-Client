import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppText } from '@screens/Shared';

type Props = {
  navigation: StackNavigationProp<any>;
};

export class Product extends React.Component<Product> {
  public render(): JSX.Element {
    return (
      <>
        <AppText.Body>Shoe</AppText.Body>
      </>
    );
  }
}
