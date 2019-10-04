// In App.js in a new project


import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import {Login,Register,Home,Detail,Single} from '../Screen/index'


const AuthStack = createStackNavigator({
  Login,Register
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

const AppStack = createStackNavigator({
  Home,Detail,Single
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });


///

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
	  this.props.dispatch({type:'LOGINUSER',user:JSON.parse(userToken)})

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator></ActivityIndicator>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
AuthLoadingScreen = connect(null,null)(AuthLoadingScreen)
///


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
