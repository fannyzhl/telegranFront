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
import {ip} from "../client/client"
import { AsyncStorage } from 'react-native';

export default class Mobil extends Component {
  state = {
   phoneNumber: null,
   errors: [],
   loading: false
  };

  async handleMobile() {
    const { navigation } = this.props;
    const { phoneNumber } = this.state;
    const id = await AsyncStorage.getItem('id')
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!phoneNumber) errors.push("phoneNumber");
   

    this.setState({ errors, loading: false });

    var json ={
      number:phoneNumber,
      id_user:id

    }
    let configs = {
          method: 'POST',
          body: JSON.stringify(json),
          withCredentials: true,
          credentials: 'include',
          headers: {
              'Content-type': 'application/json'
          }
    }
    fetch(ip+'/user/guardarNumero', configs)
      .then(res => res.json())
      .then(data => {console.log(data)
          if(data.status == 200){
            navigation.navigate("Codes");
          }else if (data.status == 401){
            Alert.alert(data.response);
          }else if (data.status == 500){
            Alert.alert(data.response);
          }
    }); 
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.mobil} behavior="padding">
        <Block padding={[0, theme.sizes.base * 6]}>
          <Text h1 bold>
            PHONE NUMBER
          </Text>
          <Block middle>
            <Input
              phoneNumber
              label="phoneNumber"
              error={hasErrors("phoneNumber")}
              style={[styles.input, hasErrors("phoneNumber")]}
              defaultValue={this.state.phoneNumber}
              id="number"
              onClick="code(number)"
              onChangeText={number => this.setState({ phoneNumber: number })}
            />
           
            <Button gradient  onPress={() => this.handleMobile()}>
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
  mobil: {
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
