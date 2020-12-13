import React from 'react';
import {View, Text} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import io from 'socket.io-client';
const socket = io();


export default class Codes extends Component {
    
    state = {
        messages: [],
        id:"",
        id_group:""
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
    async onSend(sms){
        // const id = await AsyncStorage.getItem('id');
        // const id_group= await AsyncStorage.getItem('id_group');
        const { id, id_group } = this.state;

        var json ={
            "sms":sms,
            "id_user":id,
            "id_group":id_group
        }
        socket.emit('mensaje', json);
    }
    render () {
        return (
            <GiftedChat
            messages={messages}
            onSend={(message) => {onSend(messages)}}
            user={{
              _id: 1,
            }}
          />
        );
    }
}

chat.defaultProps = {
    name: "fanny"
};

chat.propTypes = {
    name: React.PropTypes.string,
}

const { id_group } = this.state;
socket.on('mensaje/'+id_group, function (msj) { 
    console.log(msj)
    //$('#listado-msjs').append( $('<li>').text(msj) );
});