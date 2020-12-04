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

export default class SignUp extends Component {
  state = {
    name: null,
    lastname: null,
    username: null,
    errors: [],
    loading: false
  };

  handleSignUp() {
    console.log("aaaa");
    const { navigation } = this.props;
    const { name, username, lastname } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!name) errors.push("name");
    if (!username) errors.push("username");
    if (!lastname) errors.push("lastname");

    this.setState({ errors, loading: false });

    var json ={
      name: name,
      last_name: lastname,
      username: username

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
    fetch(ip+'/user/registrar', configs)
      .then(res => res.json())
      .then(data => {console.log(data)
          if(data.status == 200){
            navigation.navigate("Mobil");
            AsyncStorage.setItem('id', JSON.stringify(data.user))
          }else if(data.status == 401){
            Alert.alert(data.response);
          }else if (data.status == 500){
            Alert.alert(data.response);
          }
    });

    // if (!errors.length) {
    //   Alert.alert(
    //     "Success!",
    //     "Your account has been created",
    //     [
    //       {
    //         text: "Continue",
    //         onPress: () => {
    //           navigation.navigate("Settings");
    //         }
    //       }
    //     ],
    //     { cancelable: false }
    //   );
    // }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Sign Up
          </Text>
          <Block middle>
            <Input
              name
              label="Name"
              error={hasErrors("name")}
              style={[styles.input, hasErrors("name")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ name: text })}
            />
            <Input
              lastname
              label="lastname"
              error={hasErrors("lastname")}
              style={[styles.input, hasErrors("lastname")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ lastname: text })}
            />
            <Input
              username
              label="Username"
              error={hasErrors("username")}
              style={[styles.input, hasErrors("username")]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign Up
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
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
