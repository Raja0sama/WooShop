import React, { Component } from 'react';
import { View, StatusBar, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import colors from '../../../colors.json';
import GButton from '../../../component/GButton';
import ButtonC from '../../../component/Button';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailcolor: colors.background,
			passwordcolor: colors.background,
			checked: false
		};
	}

	render() {
		return (
			<View style={style.ViewStyle}>
				<StatusBar backgroundColor={colors.background} barStyle={colors.stutsbarContent} />

				<Text style={style.TextStyle}>WELCOME , </Text>
				<Text style={style.subTextStyle}>sign in to continue</Text>
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
						placeholderTextColor={colors.color}
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
						placeholderTextColor={colors.color}
					/>

					<GButton Text={'LOGIN'} onPress={() => this.props.navigation.navigate('Menu')} />
				</View>
				<ButtonC Text={'REGISTER ?'} onPress={() => this.props.navigation.navigate('Register')} />
			</View>
		);
	}
}
const style = StyleSheet.create({
	ViewStyle: {
		backgroundColor: colors.background,
		flex: 1,
		padding: 30
	},
	TextStyle: {
		color: colors.color,
		marginTop: 20,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	},
	subTextStyle: {
		color: colors.color,
		top: -8,
		fontSize: 20,
		fontFamily: 'Montserrat-Light'
	},
	inputStyle: {
		fontSize: 15,
		color: colors.color,
		fontFamily: 'Montserrat-Light'
	},
	inputContainer: {
		paddingTop: 40,
		flex: 1
	}
});
export default Login;
