import React, { Component} from "react";
import {ip} from "../client/client"
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button, Icon, Title, Picker } from 'native-base';
import {Modal, View, StyleSheet} from 'react-native';


export default class Home extends Component {
  /* static navigationOptions = {
    header:null
  } */
  state = {
      arrayList:[],
      modalVisibility: false
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

  ShowModalFunction() {
    this.setState({ modalVisibility: true });
  }

  render() {
    const { navigation } = this.props;
    const { profile, editing } = this.state;

    return (
      
      <Container>
        <Header>
          <Left>
            <Button transparent >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Chats List</Title>
          </Body>
          <Right>
            <Button transparent>
            {/* navigation.navigate("Group") */}
              <Icon name='add' onPress={() => navigation.navigate("Group")}/>
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {this.state.arrayList.map(item => (
              <ListItem onPress={()=>this.list(item.id_group)}>
                <Text>
                  {item.name}
                </Text>
              </ListItem>
            ))}
          </List>
        </Content>
       {/*  <Modal
        transparent={false}
        animationType={"slide"}
        visible={this.state.modalVisibility}
        onRequestClose={() => { this.ShowModalFunction(!this.state.modalVisibility) }} >
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.ModalInsideView}>
                  <Text style={{color:'black',fontSize:14,fontWeight:'700'}}>Channel, Group</Text>
                    <Picker
                    mode="dropdown"
                    iosHeader="Select"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '100%' }}
                    selectedValue={this.state.selected}
                    onValueChange={() => console.log('hi')}
                    >
                    <Picker.Item label="Channel" value="key0" />
                    <Picker.Item label="Group" value="key1" />
                  </Picker>
                  <Button gradient onPress={() => navigation.navigate("Group")}>
                      <Text center semibold white>Next</Text>
                      <Icon name='arrow-forward' />
                </Button>
                </View>
            </View>
        </Modal> */}
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({        
  ModalInsideView:{
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor : "#E5E2E2", 
    height: 245 ,
    width: '90%',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
   
  }
})
