import React, { Component} from "react";
import {ip} from "../client/client"
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button, Icon, Title, Input } from 'native-base';


export default class Group extends Component {
  /* static navigationOptions = {
    header:null
  } */
  state = {
      arrayList:[],
      name:""
  };

  componentDidMount() {
    this.handleRead();

  }
  async list(id){
    AsyncStorage.setItem('id_group', JSON.stringify(id))
    const { navigation } = this.props;
    navigation.navigate("Chat");
  }
  async handleRead(){
    const token = await AsyncStorage.getItem('token');
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
    fetch(ip+'/group/leerUsuarios', configs)
      .then(res => res.json())
      .then(data => {//console.log(data)
          if(data.status == 200){
            const group = data.data;
            console.log(group);
            this.setState({ arrayList: group })
          }else if (data.status == 401){
            Alert.alert(data.response);
          }else if (data.status == 500){
            Alert.alert(data.response);
          }
    });
  } 

  render() {
    return (
      
      <Container>
        <Header>
          <Left>
            <Button transparent >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Group/Chat</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
        <Content>
            <Input 
            name
            placeholder='Enter name'
            onChangeText={names => this.setState({ name: names })}
            />
            <Text>Select users</Text>
            <List>
            {this.state.arrayList.map(item => (
              <ListItem onPress={()=>this.list(item.id_group)}>
                <Text>
                  {item.username}
                </Text>
              </ListItem>
            ))}
            </List>
        </Content>
      </Container>
    );
  }
}


