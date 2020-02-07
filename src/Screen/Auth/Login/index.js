import React, { Component } from 'react';
import { View, StatusBar, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import GButton from '../../../component/GButton';
import ButtonC from '../../../component/Button';
import { Mutation } from 'react-apollo';
import {ThemeColor as color } from '../../../colors'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { login } from '../../../Graphql/Actions/index'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailcolor: color.Primary,
			passwordcolor: color.Primary,
			checked: false,
			username: '',
			password: '',
			ll: false
		};
	}
	componentDidMount() {
		
	}
	LoginNow(login) {
		this.setState({ ll: true });
		login({
			variables: {
				username: this.state.username,
				password: this.state.password
			}
		})
			.then((res) => {
				this.setState({ ll: false });
				AsyncStorage.setItem('userToken', JSON.stringify(res.data.login));
				this.props.dispatch({ type: 'LOGINUSER', user: res.data.login });
				this.props.navigation.navigate('App');
			})
			.catch((err) => {
				
				console.warn(err);
				// Toast.show(err.graphQLErrors[0].message);
				this.setState({ ll: false });
			});
	}

	render() {
		return (
			<View style={style().ViewStyle}>
				<StatusBar backgroundColor={color.Primary} barStyle={color.stutsbarContent} />

				<Text style={style.TextStyle}>WELCOME ,</Text>
				<Text style={style.subTextStyle}>sign in to continue</Text>

				<Mutation mutation={login}>
					{(login, { data }) => (
						<View style={style.inputContainer}>
							<Input
								inputStyle={style.inputStyle}
								placeholder="Email"
								rightIcon={{
									type: 'font-awesome',
									name: 'check',
									color: this.state.emailcolor,
									size: 15
								}}
								onChangeText={(e) => this.setState({ username: e })}
								placeholderTextColor={color.PrimaryF}
							/>
							<Input
								inputStyle={style.inputStyle}
								placeholder="Password"
								secureTextEntry={true}
								rightIcon={{
									type: 'font-awesome',
									name: 'check',
									color: this.state.passwordcolor,
									size: 15
								}}
								onChangeText={(e) => this.setState({ password: e })}
								placeholderTextColor={color.PrimaryF}
							/>

							<GButton loading={this.state.ll} Text={'LOGIN'} onPress={() => this.LoginNow(login)} />
						</View>
					)}
				</Mutation>

				<ButtonC Text={'REGISTER ?'} onPress={() => this.props.navigation.navigate('Register')} />
			</View>
		);
	}
}
const style = () => StyleSheet.create({
	ViewStyle: {
		backgroundColor: color.Primary,
		flex: 1,
		padding: 30
	},
	TextStyle: {
		color: color.PrimaryF,
		marginTop: 20,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	},
	subTextStyle: {
		color: color.PrimaryF,
		top: -8,
		fontSize: 20,
		fontFamily: 'Montserrat-Light'
	},
	inputStyle: {
		fontSize: 15,
		color: color.PrimaryF,
		fontFamily: 'Montserrat-Light'
	},
	inputContainer: {
		paddingTop: 40,
		flex: 1
	}
});
const mapStateToProps = (state /*, ownProps*/) => {
	return {};
};

export default connect(mapStateToProps)(Login);
