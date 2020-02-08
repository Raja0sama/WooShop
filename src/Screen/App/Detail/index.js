import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, FlatList, Text, Animated } from 'react-native';
import {HeaderC,SearchC,ICard} from '../../../component/index';
import GetProducts from './GraphQLComponent/Product.js'
import { ThemeColor as color } from '../../../colors'

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
		return <ICard data={{ item, index }} />;
	}
	style =  StyleSheet.create({
		ViewStyle: {
			backgroundColor: color.Primary,
			flex: 1
		}
	});
	render() {
		return (
			<View style={this.style.ViewStyle}>
				<View style={{ backgroundColor: color.Primary, paddingBottom: 20 }} >
					<HeaderC heading={"Products"} navigation={this.props.navigation} />
					<SearchC />
				</View>
				<ScrollView style={{ flex: 1 }}>


					<GetProducts orderby={this.props.navigation.getParam('orderby', 0)} render={this._renderItem} />


				</ScrollView>

			</View>
		);
	}
}
export default Detail;
