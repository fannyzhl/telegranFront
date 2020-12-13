import React, { useContext, Component, useEffect } from "react";
import { Image, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import Slider from "react-native-slider";
import { Divider, Button, Block, Text, Switch, Input } from "../components";
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
    this.handleRead();

  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  }
  
  
  async handleRead(){
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    const arrayToken= token.split('"', 2)
    const auto= 'Bearer '+arrayToken[1];
    console.log(auto)
    let configs = {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
          "Authorization": auto
      }
    }
    fetch(ip+'/profile/leerPerfil/'+id, configs)
      .then(res => res.json())
      .then(data => {console.log(data)
          if(data.status == 200){
            const user = data.data[0];
            console.log(user);
            this.setState({ name: user.name })
            this.setState({ lastname: user.last_name })
            this.setState({ username: user.username })
            this.setState({ phone: user.number })
          }else if (data.status == 401){
            Alert.alert(data.response);
          }else if (data.status == 500){
            Alert.alert(data.response);
          }
    });
  } 

  editUser() {
    //const { navigation } = this.props;
    const { phoneNumber } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!phoneNumber) errors.push("phoneNumber");
   

    this.setState({ errors, loading: false });

    var json ={
      number:phoneNumber

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
    fetch(ip+'/user/enviarCodigo', configs)
      .then(res => res.json())
      .then(data => {console.log(data)
          if(data.status == 200){
            AsyncStorage.setItem('id', JSON.stringify(data.user))
            navigation.navigate("loginCode");
          }else if (data.status == 401){
            Alert.alert(data.response);
          }else if (data.status == 500){
            Alert.alert(data.response);
          }
    }); 
  }
  
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
              <Input
                name
                label="Name"
                style={[styles.input2]}
                defaultValue={this.state.name}
                id="name"
                onChangeText={names => this.setState({ name: names })}
              />
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Input
                lastname
                label="Lastname"
                style={[styles.input2]}
                defaultValue={this.state.lastname}
                id="lastname"
                onChangeText={lastnames => this.setState({ lastname: lastnames })}
              />
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Input
                username
                label="Username"
                style={[styles.input2]}
                defaultValue={this.state.username}
                id="username"
                onChangeText={usernames => this.setState({ username: usernames })}
              />
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Input
                phone
                label="Phone"
                style={[styles.input2]}
                defaultValue={this.state.phone}
                id="username"
                onChangeText={number => this.setState({ phone: number })}
              />
            </Block>
          </Block>

          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
    
          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
            <Button gradient onPress={() => navigation.navigate("Welcome")}>
              <Text center semibold white>
                Edit
              </Text>
            </Button>
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
  input2: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
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

