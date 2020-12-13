import React, {Component , useCallback,}from 'react';
//import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import { AppRegistry, View, StatusBar } from "react-native";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";
import io from 'socket.io-client';
const socket = io();


export default class Chat extends Component {
    
    state = {
        sms:"",
        id:"",
        id_group:"",
    }; 
    
    componentDidMount() {
        this.readSms()
    }
    async readSms(){ 
        const id = await AsyncStorage.getItem('id');
        const id_group= await AsyncStorage.getItem('id_group');

        this.setState({ id: id })
        this.setState({ id_group: id_group })

        let json = {
            "id_user":id,
            "id_group":id_group
        }
        socket.emit("chat", json)

        socket.on("chat/"+id_group+"/"+id, function (obj){
            obj.map(function(x) {
              $('#listado-msjs').append( $('<li>').text(x.sms) );
            });  
        });
    }
    async onSend(){
        // const id = await AsyncStorage.getItem('id');
        // const id_group= await AsyncStorage.getItem('id_group');
        const { id, id_group,sms } = this.state;
        console.log(sms);

        var json ={
            "sms":sms,
            "id_user":id,
            "id_group":id_group
        }
        await socket.emit('mensaje', json);
    }

   
    
    render () {
        const { id_group } = this.state;
        socket.on('mensaje/'+id_group, function (msj) { 
            console.log(msj)
            //$('#listado-msjs').append( $('<li>').text(msj) );
        });
        return (
            <Container>
                <Header>
                <Left>
                    <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                    <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Lucy Chat</Title>
                </Body>
                <Right />
                </Header>
                <Content padder>
                <Item floatingLabel style={{ marginTop: 300 }}>
                    <Input 
                    sms
                    placeholder='Enter Message'
                    onChangeText={msj => this.setState({ sms: msj })}
                    />
                    <Icon name='paper-plane' onPress={() => this.onSend()} />
    
                    {/* <Button rounded 
                    // style={{ marginTop: 20, alignSelf: "center" }}
                    // onPress={() => navigate("Profile")}
                    >
                        <Text>Send</Text>
                    </Button> */}
                </Item>
                
                </Content>
            </Container>
        );
    }
}

// chat.defaultProps = {
//     name: "fanny"
// };

// chat.propTypes = {
//     name: React.PropTypes.string,
// }

// const { id_group } = this.state;
// socket.on('mensaje/'+id_group, function (msj) { 
//     console.log(msj)
//     //$('#listado-msjs').append( $('<li>').text(msj) );
// });