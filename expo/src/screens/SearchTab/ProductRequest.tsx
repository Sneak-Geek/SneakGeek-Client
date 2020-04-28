import React from 'react';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { View, StyleSheet, TouchableOpacity, TextInput, Modal, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { Image, Picker } from 'react-native';
import { AppText, BottomButton } from '@screens/Shared';
import { images, strings, themes } from '@resources';
import { SettingsKey, FactoryKeys, ISettingsProvider, Gender, ObjectFactory, IShoeService } from 'business';
import { getService, getToken } from 'utilities';

type Props = {

}

type State = {
  pickerValue: string;
  hidden: boolean;
  gender: Array<string>;
  genderValue: string;
  pickerVisible: boolean;
  pickerType: number;
  brandValue: string;
  brands: Array<string>;
  title: string;
  description: string;
}


const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    position: 'relative',
    flex: 1,
  },
  bodyContainer: {
    paddingHorizontal: 15
  },
  ImageAndTitleContainer: {
    flexDirection: 'row',
  },
  ImageContainer: {
    marginTop: 20
  },
  Image: {
    height: 75,
    width: 75,
  },
  ProductTitleShorter: {
    marginLeft: 30,
    height: 100,
    fontSize: 20,
    width: 250,
  },
  ProductTitleLonger: {
    marginLeft: 30,
    height: 100,
    fontSize: 15,
    width: 250,
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
  },
  brandPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 45
  },
  pickerStyle: {
    position: 'absolute',
    width: 500,
  },
  descriptionContainer: {
    marginTop: 45,
  },
  modalContainer: {
    backgroundColor: themes.AppModalBackground,
    flex: 1,
    position: 'relative',
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  descriptionStyle: {
    borderColor: "#C4C4C4",
    height: 40,
    borderBottomWidth: 1,
    marginTop: 20
  },
  pickerActionButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  titleText: {
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'RobotoBold'
  },
  pickerText: {
    color: themes.AppPrimaryColor
  },
  bottomButtonStyle: {
    backgroundColor: themes.AppSecondaryColor,
    borderLeftColor: 'blue',
    borderRightWidth: 1,
  }
});

export class ProductRequest extends React.Component<Props, State> {
  private settings = getService<ISettingsProvider>(FactoryKeys.ISettingsProvider);

  constructor(props: Props) {
    super(props);
    this.state = {
      pickerValue: 'Lựa chọn',
      hidden: true,
      brands: ['Lựa chọn'].concat(this.settings.getValue(SettingsKey.RemoteSettings).shoeBrands as Array<string>),
      gender: ['Lựa chọn', strings.Men, strings.Women],
      genderValue: 'Lựa chọn',
      pickerVisible: false,
      pickerType: 0,
      brandValue: 'Lựa chọn',
      title: "NMD Americana",
      description: ''
    }
  }



  updatePickerValue = (pickerType: number, pickerValue: string) => {
    switch (pickerType) {
      case 1:
        this.setState({ brandValue: pickerValue })
        break;
      case 2:
        this.setState({ genderValue: pickerValue })
        break;
    }
    this.setState({ hidden: true, pickerValue: null, pickerType: 0 });

  }

  public render(): JSX.Element {
    return (
      <SafeAreaConsumer>
        {(insets): JSX.Element => (
          <View style={{ ...styles.rootContainer, }}>
            <View style={styles.bodyContainer}>
              <View style={styles.ImageAndTitleContainer}>
                {this._renderImgUpload()}
                {this._renderProductTitle()}
              </View>
              {this._renderBrandDropDown()}
              {this._renderGenderDropDown()}
              {this._renderDescription()}
              {this._renderPicker()}
            </View>
            {this._renderContinueButton()}
          </View>
        )
        }
      </SafeAreaConsumer>
    );
  }

  private _renderImgUpload(): JSX.Element {
    return (
      <TouchableOpacity style={styles.ImageContainer} onPress={() => { }}>
        <Image source={images.ImageNotUploadedx2}
          style={styles.Image}
        />
      </TouchableOpacity>
    );
  }

  private _renderProductTitle(): JSX.Element {
    return (
      <View>
        <TextInput style={this.state.title.length < 21 ? styles.ProductTitleShorter : styles.ProductTitleLonger} placeholderTextColor="black" placeholder={this.state.title} onChangeText={(title) => { this.setState({ title: title }) }} />
      </View>
    );
  }

  private _renderBrandDropDown(): JSX.Element {
    return (
      <View style={styles.brandPickerContainer}>
        <AppText.Subhead style={styles.titleText}>{strings.Brand.toUpperCase()}</AppText.Subhead>
        <AppText.Body style={styles.pickerText} onPress={() => { this.setState({ hidden: false, pickerType: 1 }) }}>{this.state.brandValue}</AppText.Body>
      </View>
    );
  }

  private _renderPicker(): JSX.Element {
    return this.state.hidden ? <View  ></View> :
      <Modal
        presentationStyle={'overFullScreen'}
        visible={!this.state.hidden}
        transparent={true}
        animationType={'fade'}
        animated={true}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerActionButtons}>
              <Button
                title={'Cancel'}
                type={'clear'}
                onPress={() => this._onSelectPickerCancel()}
              />
              <Button
                title={'OK'}
                type={'clear'}
                onPress={() => {
                  if (this.state.pickerValue)
                    this.updatePickerValue(this.state.pickerType, this.state.pickerValue)
                }}
              />
            </View>
            <Picker selectedValue={this.state.pickerValue} onValueChange={(pickerValue) => {
              this.setState({ pickerValue: pickerValue })
            }
            }>
              {
                this.state.pickerType === 1 ? this.state.brands.map((elem, index) => {
                  return (<Picker.Item key={index} label={elem} value={elem} />);
                }) : this.state.gender.map((elem, index) => {
                  return (<Picker.Item key={index} label={elem} value={elem} />);
                })
              }
            </Picker>
          </View>
        </SafeAreaView>
      </Modal>
  }

  private _onSelectPickerCancel() {
    this.setState({ hidden: true, pickerType: 0 });
  }

  private _renderGenderDropDown(): JSX.Element {
    return (
      <View style={styles.brandPickerContainer}>
        <AppText.Subhead style={styles.titleText}>{strings.Gender.toUpperCase()}</AppText.Subhead>
        <AppText.Body style={styles.pickerText} onPress={() => { this.setState({ hidden: false, pickerType: 2 }) }}>{this.state.genderValue}</AppText.Body>
      </View>
    );
  }

  private _renderDescription(): JSX.Element {
    return (
      <View style={styles.descriptionContainer}>
        <AppText.Subhead style={styles.titleText}>{strings.OtherDescriptions.toUpperCase()}</AppText.Subhead>
        <TextInput style={styles.descriptionStyle} placeholderTextColor='#999999' placeholder="Ví dụ: Màu sắc, hoạ tiết,..." onChangeText={(value) => this.setState({
          description: value
        })}></TextInput>
      </View>
    );
  }

  private _renderContinueButton(): JSX.Element {
    return (
      <BottomButton
        style={{ ...styles.bottomButtonStyle }}
        title={strings.Continue}
        onPress={() => { this._continueButtonHandle() }}
      />
    );
  }

  private async _continueButtonHandle() {
    if (this.state.genderValue === "Lựa chọn" || this.state.brandValue === "Lựa chọn") {
      alert("Hãy điền nốt những mục còn thiếu!")
      return;
    }
    const token = getToken();
    const gender = this.state.genderValue === strings.Men ? 'men' : 'women';
    const _shoeService = ObjectFactory.getObjectInstance<IShoeService>(
      FactoryKeys.IShoeService
    );
    try {
      await _shoeService.updateRequestProduct(token, this.state.title, this.state.brandValue, gender)
    } catch (error) {
      console.log(error)
      alert("Unexpected Error!")
    }
  }

}