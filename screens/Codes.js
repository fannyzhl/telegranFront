import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

export default class Codes extends Component {
  state = {
   code: null,
   errors: [],
   loading: false
  };

  handleCodes() {
    const { navigation } = this.props;
    const { phoneNumber } = this.state;
    const errors = [];
    if (!errors.length) {
        navigation.navigate("SignUp");
      }

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!code) errors.push("code");
   

    this.setState({ errors, loading: false });

     if (!errors.length) {
      Alert.alert(
        "Success!",
        "Codigo ingresado",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Code");
            }
          }
        ],
        { cancelable: false }
      );
    } 
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.code} behavior="padding">
        <Block padding={[0, theme.sizes.base * 6]}>
          <Text h1 bold>
            Code
          </Text>
          <Block middle>
            <Input
              code
              label="code"
              error={hasErrors("code")}
              style={[styles.input, hasErrors("code")]}
              defaultValue={this.state.phoneNumber}
              onChangeText={number => this.setState({ code: number })}
            />
           
           <Button gradient  onPress={() => this.handleCodes()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Next
                </Text>
              )}
            </Button>

          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  code: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
