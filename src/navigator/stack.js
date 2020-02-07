// In App.js in a new project

import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import {
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideMenu from './sidemenu';

import { Login, Register, Home, Detail, Single, Cart, Checkout, Cate, CatDetail,Settings,Search } from '../Screen/index';

// This is the AuthStack, all the authentication or Registeration routes should be mentioned in auth Stacktrace


const AuthStack = createStackNavigator(
	{
		Login,
		Register
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);

// App Stack Carrys all the route for the normal Logged in Screeens

const AppStack = createStackNavigator(
	{
		Home,
		Detail,
		Single,
		Cart,
		Checkout,
		Cate,Search,
		CatDetail,Settings
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		},
		
	}
);

// Drawer //
const MainNavigator = createDrawerNavigator({
	MainStack: {
	  screen: AppStack,
	},
  }, {
	contentComponent: SideMenu,
	  drawerWidth: 300
	});
  

// This routes verify if the person is logged in or not

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');
		this.props.dispatch({ type: 'LOGINUSER', user: JSON.parse(userToken) });
		this.props.navigation.navigate(userToken ? 'App' : 'Auth');
	};

	// Render any loading content that you like here
	render() {
		return (
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}
AuthLoadingScreen = connect(null, null)(AuthLoadingScreen);


// Routes Handler

export default createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			App: MainNavigator,
			Auth: AuthStack
		},
		{
			initialRouteName: 'AuthLoading'
		}
	)
);
