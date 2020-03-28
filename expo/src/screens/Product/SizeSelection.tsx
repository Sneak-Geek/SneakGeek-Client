import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SizePricePicker } from '@screens/Shared/SizePricePicker';
import { getService } from 'utilities';
import { ISettingsProvider, FactoryKeys, SettingsKey, Shoe } from 'business';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from 'navigations/RootStack';
import { ShoeHeaderSummary, BottomButton } from '@screens/Shared';
import { strings, themes } from '@resources';

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});

type Props = {
  navigation: StackNavigationProp<RootStackParams>;
  route: RouteProp<RootStackParams, 'SizeSelection'>;
};

export class SizeSelection extends React.Component<Props> {
  private shoeSizes: string[] = [];
  private shoe: Shoe;

  public constructor(props: any) {
    super(props);

    const settings = getService<ISettingsProvider>(FactoryKeys.ISettingsProvider);
    this.shoeSizes = settings.getValue(SettingsKey.RemoteSettings).shoeSizes.Adult;
    this.shoe = this.props.route.params.shoe;
  }

  public render(): JSX.Element {
    return (
      <SafeAreaView style={styles.rootContainer}>
        <View style={{ flex: 1 }}>
          <ShoeHeaderSummary shoe={this.shoe} />
          <SizePricePicker
            sizes={this.shoeSizes}
            style={{ marginTop: 15 }}
            priceMap={new Map()}
          />
          <BottomButton
            onPress={() => {}}
            title={strings.Continue}
            style={{ backgroundColor: themes.AppSecondaryColor }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
