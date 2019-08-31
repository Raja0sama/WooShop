import React from 'react'
import {View,Button,Text} from 'react-native'
import AppNavigator from './navigator/stack'
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { ApolloProvider,graphql, Mutation } from 'react-apollo';


const Login = gql`
mutation LoginUser($username: String!, $password: String!) {
    login( input: {
      clientMutationId:"uniqueId"
      username: $username
      password: $password
    } ) {
      authToken
      user {
        id
        name
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://eproject.tk/graphql',
});

class App extends React.Component {
constructor(props){
    super(props)
}
asd(){
    
        login({
          variables: {
           username : 'admin',
           password : 'admin'
          }
        })
          .then(res => console.log(res))
          .catch(err => <Text>{err}</Text>);
        this.setState({ type: '', name: '' });
      
}
    render(){
    return (
        <ApolloProvider client={client}><AppNavigator></AppNavigator></ApolloProvider>
    )
}
}
export default App

