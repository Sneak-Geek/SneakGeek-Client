import React, { useState, useContext } from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {},
});

const SignUpContext = React.createContext({
  email: '',
  toggleEmail: () => {},
});

const EmailBox = (): JSX.Element => {
  const { email } = useContext(SignUpContext);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.absolute}>
        <Text.Footnote style={styles.email}>Email</Text.Footnote>
      </View>
      <TextInput
        style={styles.input}
        placeholder={'Email của bạn'}
        value={email}
        placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
        onChangeText={email => this.setState({ email }, () => this.validateButton())}
        selectionColor={Assets.Styles.AppPrimaryColor}
        autoCapitalize="none"
      />
    </View>
  );
};

export const EmailSignUpScreen = (): JSX.Element => {
  return (
    <SignUpContext.Provider value={{ email: '' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 42 }}>
            <EmailBox />
            {this.renderPassword()}
            {this.renderForgot()}
          </View>
          {this.renderButton()}
        </View>
      </SafeAreaView>
    </SignUpContext.Provider>
  );
};
