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
      arrayList:[]
  };

  componentDidMount() {
    this.handleRead();

  }
  
  async handleRead(){
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    const arrayToken= token.split('"', 2)
    const auto= 'Bearer '+arrayToken[1];
    
    let configs = {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
          "Authorization": auto
      }
    }
    fetch(ip+'/group/leerGrupos/'+id, configs)
      .then(res => res.json())
      .then(data => {console.log(data)
          if(data.status == 200){
            const user = data.data[0];
            // console.log(user);
            // this.setState({ name: user.name })
            // this.setState({ lastname: user.last_name })
            // this.setState({ username: user.username })
            // this.setState({ phone: user.number })
          }else if (data.status == 401){
            Alert.alert(data.response);
          }else if (data.status == 500){
            Alert.alert(data.response);
          }
    });
  } 

  render() {
    const { navigation } = this.props;
    const { profile, editing } = this.state;

    return (
      
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Home
          </Text>
        </Block>

        
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

