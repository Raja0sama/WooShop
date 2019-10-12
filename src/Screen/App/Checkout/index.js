import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Card, CheckBox, Overlay } from 'react-native-elements';
import colors from '../../../colors.json';
import LinearGradient from 'react-native-linear-gradient';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderC from '../../../component/header';

const CheckoutQ = gql`
	mutation checkout($input: CheckoutInput!) {
		checkout(input: $input) {
			clientMutationId
			order {
				id
				refunds {
					nodes {
						amount
					}
				}
			}
			customer {
				id
			}
			result
			redirect
		}
	}
`;
class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false
        };
        
        AsyncStorage.getItem('userToken').then(res => {
            this.setState({user:JSON.parse(res)})
        })
        console.log({ input: {
            clientMutationId: 'Mu' + Math.random(),
            billing: {
                firstName: this.state.bfn ? this.state.bfn : '',
                lastName: this.state.bln ? this.state.bln : '',
                postcode: this.state.bpc ? this.state.bpc : '',
                address1: this.state.ba1 ? this.state.ba1 : '',
                address2: this.state.ba2 ? this.state.ba2 : '',
                city: this.state.bc ? this.state.bc : '',
                email: this.state.be ? this.state.be : '',
                country: this.state.bC ? this.state.bC : '',
                company: this.state.bCP ? this.state.bCP : '',
                state: this.state.bs ? this.state.bs : ''
            },
            paymentMethod: 'cod',
            paymentMethodTitle: 'Cash on Delivery',
            shipToDifferentAddress: this.state.checked,
            shipping: {
                firstName: this.state.sfn ? this.state.sfn : '',
                lastName: this.state.sln ? this.state.sln : '',
                postcode: this.state.spc ? this.state.spc : '',
                address1: this.state.sa1 ? this.state.sa1 : '',
                address2: this.state.sa2 ? this.state.sa2 : '',
                city: this.state.sc ? this.state.sc : '',
                email: this.state.se ? this.state.se : '',
                country: this.state.sC ? this.state.sC : '',
                company: this.state.sCP ? this.state.sCP : '',
                state: this.state.ss ? this.state.ss : ''
            }
        }})

	}
	checkout(params) {
		params().then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
	}
	render() {
		return (
			<View>
				<HeaderC heading={'Checkout'} navigation={this.props.navigation} />
				<ScrollView>
                    <Mutation 
                    context={{ headers: {
                        authorization: this.state.user ? `Bearer ${this.state.user.authToken}` : ""
                      }}}
                    variables={{
                            "input": {
                              "clientMutationId": 'Mu' + Math.random(),
                              "billing": {
                                "firstName": this.state.bfn ? this.state.bfn : '',
                                "lastName": this.state.bln ? this.state.bln : '',
                                "postcode": this.state.bpc ? this.state.bpc : '',
                                "address1": this.state.ba1 ? this.state.ba1 : '',
                                "address2": this.state.ba2 ? this.state.ba2 : '',
                                "city": this.state.bc ? this.state.bc : '',
                                "email": this.state.be ? this.state.be : '',
                                "country": this.state.bC ? this.state.bC : 'PK',
                                "company": this.state.sCP ? this.state.sCP : '',
                                "state": this.state.ss ? this.state.ss : ''
                              },
                              "paymentMethod": 'cod',
                              "paymentMethodTitle": 'Cash on Delivery',
                              "shipToDifferentAddress": this.state.checked,
                              "shipping": {
                                "firstName": this.state.sfn ? this.state.sfn : '',
                                "lastName": this.state.sln ? this.state.sln : '',
                                "postcode": this.state.spc ? this.state.spc : '',
                                "address1": this.state.sa1 ? this.state.sa1 : '',
                                "address2": this.state.sa2 ? this.state.sa2 : '',
                                "city": this.state.sc ? this.state.sc : '',
                                "email": this.state.se ? this.state.se : '',
                                "country": this.state.sC ? this.state.sC : 'PK',
                                "company": this.state.sCP ? this.state.sCP : '',
                                "state": this.state.ss ? this.state.ss : ''
                            }
                            }
                          }
                        } mutation={CheckoutQ}>
						{(CheckoutInput, { data }) => (
							<View style={{ margin: 20 }}>
								<Card title="Billing Information">
									<Input placeholder="First Name" onChangeTextText={(e) => this.setState({ bfn: e })} />
									<Input placeholder="Last Name" onChangeTextText={(e) => this.setState({ bln: e })} />
									<Input placeholder="Address 1" onChangeTextText={(e) => this.setState({ ba1: e })} />
									<Input placeholder="Address 2" onChangeText={(e) => this.setState({ ba2: e })} />
									<Input placeholder="City" onChangeText={(e) => this.setState({ bc: e })} />
									<Input placeholder="Country" onChangeText={(e) => this.setState({ baC: e })} />
									<Input placeholder="Company" onChangeText={(e) => this.setState({ bCP: e })} />
									<Input placeholder="Email" onChangeText={(e) => this.setState({ be: e })} />
									<Input placeholder="Phone" onChangeText={(e) => this.setState({ bp: e })} />
									<Input placeholder="PostCode" onChangeText={(e) => this.setState({ bpc: e })} />
									<Input placeholder="State" onChangeText={(e) => this.setState({ bs: e })} />
									<CheckBox
										center
										title="Ship to different Address ?"
										checked={this.state.checked}
										onPress={() => this.setState({ checked: !this.state.checked })}
									/>
								</Card>
								{this.state.checked ? (
									<Card title="Shipping Information">
										<Input placeholder="First Name" onChangeText={(e) => this.setState({ sfn: e })} />
										<Input placeholder="Last Name" onChangeText={(e) => this.setState({ sln: e })} />
										<Input placeholder="Address 1" onChangeText={(e) => this.setState({ sa1: e })} />
										<Input placeholder="Address 2" onChangeText={(e) => this.setState({ sa2: e })} />
										<Input placeholder="City" onChangeText={(e) => this.setState({ sc: e })} />
										<Input placeholder="Country" onChangeText={(e) => this.setState({ saC: e })} />
										<Input placeholder="Company" onChangeText={(e) => this.setState({ sCP: e })} />
										<Input placeholder="Email" onChangeText={(e) => this.setState({ se: e })} />
										<Input placeholder="Phone" onChangeText={(e) => this.setState({ sp: e })} />
										<Input placeholder="PostCode" onChangeText={(e) => this.setState({ spc: e })} />
										<Input placeholder="State" onChangeText={(e) => this.setState({ ss: e })} />
									</Card>
								) : (
									<View />
								)}
								<Card title="Payment Method">
									<Text>Cash On Delivery Only Supported YET!</Text>
								</Card>
								<TouchableOpacity
									onPress={() => {
									CheckoutInput();
									}}
								>
									<LinearGradient
										start={{ x: 1, y: 2 }}
										end={{ x: 0.1, y: 0.2 }}
										colors={colors.gredientB}
										style={{
											alignItems: 'center',
											justifyContent: 'center',
											margin: 10,
											height: 50,
											backgroundColor: colors.themeC,
											borderRadius: 20,
											marginBottom: 60
										}}
									>
										<Text style={{ color: colors.rcolor, fontSize: 20 }}>CHECKOUT</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
						)}
					</Mutation>
				</ScrollView>
				{this.state.isLogout ? (
					<Overlay isVisible={this.state.isLogout}>
						<Text style={{ color: colors.color, margin: 20 }}>
							{' '}
							OH You Are Logged Out! Login Again Kindly
						</Text>
						<Input placeholder="User Name" onChangeText={(e) => this.setState({ username: e })} />
						<Input placeholder="Password" onChangeText={(e) => this.setState({ password: e })} />
						<LinearGradient
							start={{ x: 1, y: 2 }}
							end={{ x: 0.1, y: 0.2 }}
							colors={colors.gredientB}
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								margin: 10,
								height: 30,
								backgroundColor: colors.themeC,
								borderRadius: 20
							}}
						>
							<Text style={{ color: colors.rcolor, fontSize: 15 }}>Login</Text>
						</LinearGradient>
					</Overlay>
				) : (
					<View />
				)}
			</View>
		);
	}
}
export default Checkout;
