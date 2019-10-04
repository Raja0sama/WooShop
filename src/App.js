import React,{createContext} from 'react'
import AppNavigator from './navigator/stack'
import ApolloClient from 'apollo-boost';
import { ApolloProvider  } from 'react-apollo';
import { Provider } from 'react-redux'
import store from './Redux/Store'


const client = new ApolloClient({
  uri: 'https://eproject.tk/graphql',
});

class App extends React.Component {
constructor(props){
    super(props)
}

    render(){
    return (
      <Provider store={store}>
          <ApolloProvider client={client}><AppNavigator></AppNavigator></ApolloProvider>
    </Provider>
    )
}
}
export default App

