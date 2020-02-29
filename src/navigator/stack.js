// In App.js in a new project

import React from 'react';
import { ActivityIndicator, StatusBar, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import {
	createSwitchNavigator,
} from '@react-navigation/compat';
import { createStackNavigator } from '@react-navigation/stack';
import {
	createDrawerNavigator, DrawerContentScrollView,
	DrawerItemList, DrawerItem
} from '@react-navigation/drawer';
import SideMenu from './sidemenu';
import { Layout, withStyles, Spinner } from '@ui-kitten/components';

import { Login, Register, Home, Detail, Single, Cart, Checkout, Cate, CatDetail, Settings, Search } from '../Screen/index';

// This is the AuthStack, all the authentication or Registeration routes should be mentioned in auth Stacktrace



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			headerMode="none"
			navigationOptions={{ headerVisible: false }}
			options={{ headerShown: false }}
			screenOptions={{ gestureEnabled: false }}
		>
			<Stack.Screen
				name="Login"
				component={Login}
			/>
			<Stack.Screen
				name="Register"
				component={Register}
			/>
		</Stack.Navigator>
	);
}

function AppStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"

			headerMode="none"
			navigationOptions={{ headerVisible: false }}
			options={{ headerShown: false }}
			screenOptions={{ gestureEnabled: false }}
		>
			<Stack.Screen
				name="Home"
				component={Home}
			/>
			<Stack.Screen
				name="Detail"
				component={Detail}
			/>
			<Stack.Screen
				name="Single"
				component={Single}
			/>
			<Stack.Screen
				name="Cart"
				component={Cart}
			/>
			<Stack.Screen
				name="Checkout"
				component={Checkout}
			/>
			<Stack.Screen
				name="Cate"
				component={Cate}
			/>
			<Stack.Screen
				name="Search"
				component={Search}

			/>

			<Stack.Screen
				name="CatDetail"
				component={CatDetail}

			/>
			<Stack.Screen
				name="Settings"
				component={Settings}

			/>

		</Stack.Navigator>
	);
}


class MainNavigator extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			user: null
		}
	}

	componentDidMount() {
		AsyncStorage.getItem('userToken').then(res => {
			
			this.setState({ user: JSON.parse(res) })
		})
	}

	render() {
		if (this.state.user == null) { return (<View></View>) } else {
			return (
				<Drawer.Navigator drawerStyle={[{ width: 300 }]} drawerContent={() => <SideMenu user={this.state.user} />}  >
					<Drawer.Screen name="AppStack" component={AppStack} />
				</Drawer.Navigator>
			)
		}
	}


}
// class AuthLoadingScreen extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this._bootstrapAsync();
// 	}

// 	_bootstrapAsync = async () => {
// 		const userToken = await AsyncStorage.getItem('userToken');
// 		this.props.dispatch({ type: 'LOGINUSER', user: JSON.parse(userToken) });
// 		this.props.navigation.navigate(userToken ? 'App' : 'Auth');
// 	};

// 	// Render any loading content that you like here
// 	render() {
// 		const { themedStyle, style, ...restProps } = this.props;

// 		return (
// 			<Layout style={{ flex: 1 }}>

// 				<Spinner />
// 				<StatusBar barStyle="default" />
// 			</Layout>
// 		);
// 	}
// }
// AuthLoadingScreen = connect(null, null)(withStyles(AuthLoadingScreen, (theme) => ({

// })));




// const container = (createSwitchNavigator)(
// 	{
// 		AuthLoading: AuthLoadingScreen,
// 		App: MainNavigator,
// 		Auth: AuthStack
// 	},
// 	{
// 		initialRouteName: 'AuthLoading'
// 	}
// )


class Container extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			auth: true,
			loading : true
		}
	}

	componentDidMount() {
		AsyncStorage.getItem('userToken').then((res) => (
			this.setState({ auth: false,loading:false })

		)).catch(e => (
			this.setState({ auth: true,loading:false })
		))
	}
	render() {
		if (!this.props.auth.logout) {
			return (<MainNavigator />)
		} else {
			return (<AuthStack />)
		} 
		
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	
	return {
		auth: state.authentication
	}
}
export default connect(
	mapStateToProps)(Container)


// export default Container


