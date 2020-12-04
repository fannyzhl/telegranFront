import React, { useContext, Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";
import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import {ip} from "../client/client"
import { AsyncStorage } from 'react-native';


class Settings extends Component {
  /* static navigationOptions = {
    header:null
  } */
  state = {
    editing: null,
    profile: {}
  };

  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  }

  /* handleRead(){
    const id = await AsyncStorage.getItem('id')
    let configs = {
      method: 'GET',
      body: JSON.stringify(json),
      withCredentials: true,
      credentials: 'include',
      headers: {
          'Content-type': 'application/json'
      }
    }
    fetch(ip+'/user/leerPerfil/:id='+id, configs)
      .then(res => res.json())
      .then(data => {console.log(data)
          if(data.status == 200){
            console.log("aa");
          }else if (data.status == 401){
            Alert.alert(data.response);
          }else if (data.status == 500){
            Alert.alert(data.response);
          }
    });
  } */
  
  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { profile, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  }

  render() {
    const { navigation } = this.props;
    const { profile, editing } = this.state;

    return (
      
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            PROFILE
          </Text>
          <Button>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Username
                </Text>
                {this.renderEdit("username")}
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit("username")}
              >
                {editing === "username" ? "Save" : "Edit"}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Location
                </Text>
                {this.renderEdit("location")}
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit("location")}
              >
                {editing === "location" ? "Save" : "Edit"}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  E-mail
                </Text>
                <Text bold>{profile.email}</Text>
              </Block>
            </Block>
          </Block>

          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
    
          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate("Welcome")}>
            <Text center semibold white>
            Logout
            </Text>
          </Button>
          </Block>

        </ScrollView>
      </Block>
    );
  }
}

Settings.defaultProps = {
  profile: mocks.profile
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  }
});
