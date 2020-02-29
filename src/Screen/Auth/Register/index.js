import React, { useState } from 'react';
import { View, StatusBar, Image, StyleSheet } from 'react-native';
import GButton from '../../../component/GButton';
import ButtonC from '../../../component/Button';
import { Mutation } from 'react-apollo';
import Toast from 'react-native-simple-toast';
import { register } from '../../../Graphql/Actions/index'
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme-context';
import {
	Layout, Text, Input, Icon
} from '@ui-kitten/components';


const Register = () => {
	const navigation = useNavigation();
	const themeContext = React.useContext(ThemeContext);
	const [username, setusername] = useState('');
	const [email, setemail] = useState('');
	const [loading, setloading] = useState(false);
	const [password, setpassword] = useState('');
	const [fullname, setfullname] = useState('');
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const registerF = (registerUser) => {
		setloading(true)
		registerUser({
			variables: {
				input: {
					clientMutationId: "RegisterUser",
					username: username,
					email: email,
					displayName: fullname,
					password: password
				}
			}
		})
			.then(res => {
				setloading(false)
				Toast.show("An Email has been send to you");

			})
			.catch(err => {
				var a = err.graphQLErrors[0].message
				var n = a.indexOf(";:");
				Toast.show(a.substring(n + 3));
				setloading(false)
			});

	}

	const onIconPress = () => {
		setSecureTextEntry(!secureTextEntry);
	};
	const renderIcon = (style) => (
		<Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
	);
	return (

		<Layout style={style.ViewStyle}>
			<View >
				<Layout level={'4'} style={{ height: 200 }}>
					<Image
						style={{ flex: 1 }}
						source={{ uri: 'https://img.indiefolio.com/fit-in/1100x0/filters:format(webp):fill(transparent)/project/body/388476be0eff4cc3096f58e67d81bac0.jpg' }}
					/>
				</Layout>

			</View>
			<View style={{ flex: 1 }}>

				<Mutation mutation={register}>
					{(registerUser, { data }) => (
						<View style={style.inputContainer}>
							<Input
								placeholder="Full Name"
								style={{ marginTop: 10 }}
								autoCapitalize='none'
								onChangeText={(e) => setfullname(e)}
								returnKeyType={"next"}
								// onSubmitEditing={() => { this.secondTextInput.focus(); }}
								blurOnSubmit={false}
							/>
							<Input
								placeholder="Username"
								style={{ marginTop: 10 }}
								autoCapitalize='none'
								onChangeText={(e) => setusername(e)}
								returnKeyType={"next"}
								// onSubmitEditing={() => { this.secondTextInput.focus(); }}
								blurOnSubmit={false}
							/>
							<Input
								// ref={(input) => { this.secondTextInput = input; }}
								placeholder="Email"

								style={{ marginTop: 10 }}
								autoCapitalize='none'

								onChangeText={(e) => setemail(e)}
								onSubmitEditing={() => registerF(registerUser)}
							/>
							<Input
								// ref={(input) => { this.secondTextInput = input; }}
								placeholder="*******"

								style={{ marginTop: 10 }}
								secureTextEntry={secureTextEntry}
								icon={renderIcon}
								autoCapitalize='none'
								onIconPress={onIconPress}
								onChangeText={(e) => setpassword(e)}
								onSubmitEditing={() => Login(login)}
							/>

							<GButton loading={loading} Text={'REGISTER'} onPress={() => registerF(registerUser)} />
						</View>
					)}
				</Mutation>
			</View>

			<ButtonC Text={'Login ?'} onPress={() => navigation.navigate('Login')} />
		</Layout>
	)


}
const style = StyleSheet.create({
	ViewStyle: {
		flex: 1,
		padding: 30
	},
	TextStyle: {
		marginTop: 20,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	},
	subTextStyle: {
		top: -8,
		fontSize: 20,
		fontFamily: 'Montserrat-Light'
	},
	inputStyle: {
		fontSize: 15,
		fontFamily: 'Montserrat-Light'
	},
	inputContainer: {
		paddingTop: 40,
		flex: 1
	}
});
export default Register;
