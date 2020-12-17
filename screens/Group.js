import React, { Component} from "react";
import {ip} from "../client/client"
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button, Icon, Title, Input,CheckBox, Card, CardItem } from 'native-base';


export default class Group extends Component {
  /* static navigationOptions = {
    header:null
  } */
  state = {
      arrayList:[],
      name:"",
      canal:false,
      grupo:false
  };

  componentDidMount() {
    this.handleRead();

  }
  async list(id){
    AsyncStorage.setItem('id_group', JSON.stringify(id))
    const { navigation } = this.props;
    navigation.navigate("Chat");
  }
  async handleCreateGroup(){
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    const arrayToken= token.split('"', 2)
    const auto= 'Bearer '+arrayToken[1];
    
 
    let configs = {
      method: 'POST',
      body: JSON.stringify(json),
      withCredentials: true,
      credentials: 'include',
      headers: {
          "Authorization": auto
      }
    }
    var json = {
      name:"",
      type:"",
      "users":[{"id_user":"", "type":""}]
    }
    fetch(ip+'/group/registrarGrupo ', configs)
      .then(res => res.json(json))
      .then(data => {//console.log(data)
          if(data.status == 200){
            const group = data.data;
            console.log(group);
          }else if (data.status == 401){
            Alert.alert(data.response);
          }else if (data.status == 500){
            Alert.alert(data.response);
          }
    });
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
              <Icon name='add' onPress={()=>this.list(item.id_group)}/>
            </Button>
          </Right>
        </Header>
        <CheckBox checked={this.state.canal} onPress={()=>this.state.canal=true?this.setState({ canal: false }):this.setState({ canal: true})}/>
        <Text>Canal</Text>
        <CheckBox checked={this.state.grupo}  />
        <Text>Grupo</Text>
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

// import React, { Component} from "react";
// import {ip} from "../client/client"
// import { AsyncStorage } from 'react-native';
// import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button, Icon, Title, Input } from 'native-base';


// export default class Group extends Component {
//   /* static navigationOptions = {
//     header:null
//   } */
//   state = {
//       arrayList:[],
//       name:""
//   };

//   componentDidMount() {
//     this.handleRead();

//   }
//   async list(id){
//     AsyncStorage.setItem('id_group', JSON.stringify(id))
//     const { navigation } = this.props;
//     navigation.navigate("Chat");
//   }
//   async handleCreateGroup(){
//     const token = await AsyncStorage.getItem('token');
//     const id = await AsyncStorage.getItem('id');
//     const arrayToken= token.split('"', 2)
//     const auto= 'Bearer '+arrayToken[1];
    
 
//     let configs = {
//       method: 'POST',
//       body: JSON.stringify(json),
//       withCredentials: true,
//       credentials: 'include',
//       headers: {
//           "Authorization": auto
//       }
//     }
//     fetch(ip+'/group/registrarGrupo ', configs)
//       .then(res => res.json())
//       .then(data => {//console.log(data)
//           if(data.status == 200){
//             const group = data.data;
//             console.log(group);
//           }else if (data.status == 401){
//             Alert.alert(data.response);
//           }else if (data.status == 500){
//             Alert.alert(data.response);
//           }
//     });
//   }
//   async handleRead(){
//     const token = await AsyncStorage.getItem('token');
//     const arrayToken= token.split('"', 2)
//     const auto= 'Bearer '+arrayToken[1];
    
//     let configs = {
//       method: 'GET',
//       withCredentials: true,
//       credentials: 'include',
//       headers: {
//           "Authorization": auto
//       }
//     }
//     fetch(ip+'/group/leerUsuarios', configs)
//       .then(res => res.json())
//       .then(data => {//console.log(data)
//           if(data.status == 200){
//             const group = data.data;
//             console.log(group);
//             this.setState({ arrayList: group })
//           }else if (data.status == 401){
//             Alert.alert(data.response);
//           }else if (data.status == 500){
//             Alert.alert(data.response);
//           }
//     });
//   } 

//   render() {
//     return (
      
//       <Container>
//         <Header>
//           <Left>
//             <Button transparent >
//               <Icon name='menu' />
//             </Button>
//           </Left>
//           <Body>
//             <Title>Group/Chat</Title>
//           </Body>
//           <Right>
//             <Button transparent>
//               <Icon name='add' onPress={()=>this.list(item.id_group)}/>
//             </Button>
//           </Right>
//         </Header>
//         <Content>
//             <Input 
//             name
//             placeholder='Enter name'
//             onChangeText={names => this.setState({ name: names })}
//             />
//             <Text>Select users</Text>
//             <List>
//             {this.state.arrayList.map(item => (
//               <ListItem onPress={()=>this.list(item.id_group)}>
//                 <Text>
//                   {item.username}
//                 </Text>
//               </ListItem>
//             ))}
//             </List>
//         </Content>
//       </Container>
//     );
//   }
// }


