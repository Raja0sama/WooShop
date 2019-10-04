import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, FlatList, Text, Animated } from 'react-native';
import { } from 'react-native-elements';
import colors from '../../../colors.json';
import HeaderC from '../../../component/header';
import SearchC from '../../../component/Search';
import CarC from '../../../component/ICard';
import GetProducts from './GraphQLComponent/Product.js'

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			cart: true,
			entries: [1, 2, 3, 4, 5, 6, 7],
		};
	}
	updateSearch = (search) => {
		this.setState({ search });
	};
	_renderItem({ item, index }) {
		return <CarC data={{ item, index }} />;
	}

	render() {
		console.log(this.state)
		return (
			<View style={style.ViewStyle}>
				<HeaderC heading={"Products"} navigation={this.props.navigation} />
				<ScrollView style={{ flex: 1 }}>
					<SearchC />


					<GetProducts orderby={this.props.navigation.getParam('orderby', 0)} render={this._renderItem} />


				</ScrollView>

			</View>
		);
	}
}
const style = StyleSheet.create({
	ViewStyle: {
		backgroundColor: colors.background,
		flex: 1
	}
});
export default Detail;
