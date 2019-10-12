import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableHighlight } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import colors from '../../../colors.json';
import HeaderC from '../../../component/header';
import { connect } from 'react-redux';
import GetProduct from './GraphQLComponent/Product';

class Single extends Component {
	constructor(props) {
		super(props);
		this.state = {
			q: 0,
			loading: false
		};
		console.log(this.props.navigation.getParam('id', null));
	}
	onLayout = (e) => {
		this.setState({
			width: e.nativeEvent.layout.width
		});
	};
	render() {
		return (
			<View style={style.ViewStyle}>
				<HeaderC navigation={this.props.navigation} />
				<ScrollView style={{ flex: 1 }}>
					<GetProduct query={this.props.navigation.getParam('id', null)} />
				</ScrollView>
				<View
					style={{
						height: 40,
						backgroundColor: colors.background,
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
							backgroundColor: colors.background
						}}
					>
						<Icon
							reverse
							name="plus"
							type="font-awesome"
							color={colors.themeC}
							size={12}
							onPress={() => this.setState({ q: this.state.q + 1 })}
						/>
						<Text style={{ color: colors.color, fontWeight: 'bold', fontSize: 20 }}>{this.state.q}</Text>
						<Icon
							reverse
							name="minus"
							type="font-awesome"
							color={colors.themeC}
							size={12}
							onPress={() => this.setState({ q: this.state.q - 1 })}
						/>
					</View>
					<View
						style={{
							flex: 1,
							backgroundColor: colors.themeC,
							borderTopRightRadius: 30,
							borderBottomLeftRadius: 30,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Button
							loading={this.state.loading}
							buttonStyle={{ flex: 1, backgroundColor: colors.themeC }}
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
const style = StyleSheet.create({
	ViewStyle: {
		backgroundColor: colors.background,
		flex: 1
	},
	TextStyle: {
		color: colors.color,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	}
});
const mapStateToProps = (state /*, ownProps*/) => {
	console.log(state);
	return {};
};
export default connect(mapStateToProps)(Single);
