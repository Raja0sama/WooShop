import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableHighlight } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import {HeaderC} from '../../../component/index';

import { connect } from 'react-redux';
import GetProduct from './GraphQLComponent/Product';
import { ThemeColor as color } from '../../../colors'

class Single extends Component {
	constructor(props) {
		super(props);
		this.state = {
			q: 0,
			loading: false
		};
	}
	onLayout = (e) => {
		this.setState({
			width: e.nativeEvent.layout.width
		});
	};
	render() {
		return (
			<View style={style().ViewStyle}>
				<View style={{ backgroundColor: color.Primary, paddingBottom: 20 }} >
					<HeaderC navigation={this.props.navigation} />
				</View>
				<ScrollView style={{ flex: 1 }}>
					<GetProduct query={this.props.navigation.getParam('id', null)} />
				</ScrollView>
				<View
					style={{
						height: 40,
						backgroundColor: color.Primary,
						borderTopRightRadius: 30,
						flexDirection: 'row'
					}}
				>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: "transparent"
						}}
					>
						<Icon
							reverse
							name="plus"
							type="font-awesome"
							color={color.BtnG[0]}
							size={12}
							onPress={() => this.setState({ q: this.state.q + 1 })}
						/>
						<Text style={{ color: color.PrimaryF, fontWeight: 'bold', fontSize: 20 }}>{this.state.q}</Text>
						<Icon
							reverse
							name="minus"
							type="font-awesome"
							color={color.BtnG[0]}
							size={12}
							onPress={() => this.setState({ q: this.state.q - 1 })}
						/>
					</View>
					<View
						style={{
							flex: 1,
							backgroundColor: color.BtnG[0],
							color: color.PrimaryF,
							borderTopRightRadius: 30,
							borderBottomLeftRadius: 30,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Button
							loading={this.state.loading}
							buttonStyle={{ flex: 1, backgroundColor: "transparent" }}
							title={'ADD to Cart'}
							onPress={() => {
								this.setState({ loading: true });
								this.props.dispatch({
									type: 'CART_ADD',
									product: {
										Q: this.state.q,
										id: this.props.navigation.getParam('id', null),
										Pid: this.props.navigation.getParam('product', null)
									}
								});
								this.setState({ loading: false });
							}}
						/>
						{/* <Text onPress={()=> {
							
							this.props.dispatch({type:'CART_ADD',product:{Q : this.state.q, id : this.props.navigation.getParam('id', null)}
					})}}  style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, marginRight: 30 }}>
							Add to Cart
                </Text> */}
					</View>
				</View>
			</View>
		);
	}
}
const style = () => StyleSheet.create({
	ViewStyle: {
		backgroundColor: color.Primary,
		flex: 1
	},
	TextStyle: {
		color: color.PrimaryF,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	}
});
const mapStateToProps = (state /*, ownProps*/) => {
	return {};
};
export default connect(mapStateToProps)(Single);
