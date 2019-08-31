import React, { Component } from 'react';
import { View, StatusBar, Text,  StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import colors from '../../../colors.json';
import GButton from '../../../component/GButton';
import ButtonC from '../../../component/Button';
import { gql } from "apollo-boost";
import { Mutation } from 'react-apollo';
import Toast from 'react-native-simple-toast';
const Reg = gql`
mutation REGISTER_USER($input: RegisterUserInput!) {
	registerUser(input: $input) {
	  user {
		id
		name
	  }
	}
  }
`;
class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			emailcolor: colors.background,
			passwordcolor: colors.background,
			checked: false,
			ll:false
		};
	}
	RegNow(registerUser){
		this.setState({ll:true})
        registerUser({
          variables: {
            input: {
				clientMutationId: "RegisterUser",
				username: this.state.username,
				email: this.state.email
			  }
          }
        })
		  .then(res => {
			  console.log(res)
			this.setState({ll:false})
			Toast.show("An Email has been send to you");
		})
		  .catch(err => {
			var a = err.graphQLErrors[0].message
			var n = a.indexOf(";:");
			Toast.show(a.substring(n+3));

			//console.warn(err)
			this.setState({ll:false})
		});
      
}
	render() {
		return (
			<View style={style.ViewStyle}>
				<StatusBar backgroundColor={colors.background} barStyle={colors.stutsbarContent} />

				<Text style={style.TextStyle}>REGISTER NOW , </Text>
				<Text style={style.subTextStyle}>Register to create an account</Text>
				<Mutation mutation={Reg} >
				 {(registerUser, { data }) => (
				<View style={style.inputContainer}>
					<Input
						inputStyle={style.inputStyle}
						placeholder="Username"
						rightIcon={{
							type: 'font-awesome',
							name: 'check',
							color: this.state.emailcolor,
							size: 15
						}}
						placeholderTextColor={colors.color}
						onChangeText={(e)=> this.setState({username:e})}

					/>
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
						onChangeText={(e)=> this.setState({email:e})}

					/>

					<GButton loading={this.state.ll} Text={'SIGN UP'} onPress={() => this.RegNow(registerUser)} />
				</View>)}</Mutation>
				<ButtonC Text={'LOGIN ?'} onPress={() => this.props.navigation.navigate('Login')} />
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
export default Register;
