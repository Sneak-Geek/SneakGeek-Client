import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { BottomButton, ShoeHeaderSummary } from '@screens/Shared';
import { themes, strings } from '@resources';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from 'navigations/RootStack';
import { Shoe } from 'business';

type Props = {
  route: RouteProp<RootStackParams, 'OrderBuyConfirmation'>;
};

export class BuyConfirmation extends React.Component<Props> {
  private shoe: Shoe;

  public constructor(props) {
    super(props);
    this.shoe = this.props.route.params.shoe;
  }

  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ShoeHeaderSummary shoe={this.shoe} />
          <BottomButton
            style={{ backgroundColor: themes.AppSecondaryColor }}
            onPress={() => {}}
            title={strings.BuyProduct}
          />
        </View>
      </SafeAreaView>
    );
  }
}
