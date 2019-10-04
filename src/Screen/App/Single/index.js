import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../colors.json';
import HeaderC from '../../../component/header';
import { SliderBox } from 'react-native-image-slider-box';
import GetProduct from './GraphQLComponent/Product'

class Single extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [
				'https://source.unsplash.com/1024x768/?nature',
				'https://source.unsplash.com/1024x768/?water',
				'https://source.unsplash.com/1024x768/?girl',
				'https://source.unsplash.com/1024x768/?tree'
			]
		};
		console.log(this.props.navigation.getParam('id', null))
	}
	onLayout = e => {
		this.setState({
			width: e.nativeEvent.layout.width
		});
	};
	render() {
		return (
			<View style={style.ViewStyle}>
				<HeaderC navigation={this.props.navigation} />
				<ScrollView style={{ flex: 1 }}>
					<GetProduct width={this.state.width} query={this.props.navigation.getParam('id', null)} />
					
				</ScrollView>
				<View style={{ height: 40, backgroundColor: colors.background, borderTopRightRadius: 30, flexDirection: 'row' }}>
					<View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
						<Icon
							reverse
							name='plus'
							type='font-awesome'
							color={colors.themeC}
							size={12}
						/>
						<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
							1
                </Text>
						<Icon
							reverse
							name='minus'
							type='font-awesome'
							color={colors.themeC}
							size={12}
						/>
					</View>
					<View style={{ flex: 2, backgroundColor: colors.themeC, borderTopRightRadius: 30, borderBottomLeftRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, marginRight: 30 }}>
							Add to Cart
                </Text>
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
	}, TextStyle: {
		color: colors.color,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	}
});
export default Single;
