import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, FlatList, Text, Animated } from 'react-native';
import { } from 'react-native-elements';

import {HeaderC,SearchC,CarC} from '../../../component/index';

import { categories1 } from '../../../Graphql/Actions/index';
import {ThemeColor as color } from '../../../colors'
import axios from 'axios';


class Cate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			cart: true
		};
	}
	componentDidMount() {
		axios({
			url: 'https://eproject.tk/graphql',
			method: 'post',
			data: {
				query: categories1
			}
		}).then((result) => {
			this.setState({ entries: result.data.data.productCategories.nodes });
		}).catch(err=>{
		});
	}
	updateSearch = (search) => {
		this.setState({ search });
	};
	_renderItem = ({ item, index }) => {
		return <CarC navigation={this.props.navigation} data={item} onPress={() => this.props.navigation.navigate('Details')} />;
	};

	render() {
		return (
			<View style={style().ViewStyle}>
				<View style={{ backgroundColor: color.Primary, paddingBottom: 20 }} >
					<HeaderC navigation={this.props.navigation} />
					<SearchC />
				</View>
				<ScrollView style={{ flex: 1 }}>
					<View style={{ marginLeft: 15, marginRight: 15, marginTop: 10 }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										color: color.PrimaryF,
										fontSize: 18,
										fontFamily: 'Montserrat-SemiBold'
									}}
								>
									Main Categories
								</Text>
							</View>

							<View style={{ flexDirection: 'row-reverse' }}>
								<Text
									style={{
										color: color.BtnG[0],
										fontSize: 13,
										fontFamily: 'Montserrat-SemiBold'
									}}
									onPress={() => this.props.navigation.navigate('Detail')}
								>
									filter
								</Text>
							</View>
						</View>

						<FlatList data={this.state.entries} renderItem={this._renderItem} numColumns={2} />
					</View>
				</ScrollView>
			</View>
		);
	}
}
const style = () => StyleSheet.create({
	ViewStyle: {
		backgroundColor: color.Primary,
		flex: 1
	}
});
export default Cate;
