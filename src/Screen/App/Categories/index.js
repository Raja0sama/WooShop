import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, FlatList, Text, Animated } from 'react-native';
import {} from 'react-native-elements';
import colors from '../../../colors.json';
import HeaderC from '../../../component/header';
import SearchC from '../../../component/Search';
import CarC from '../../../component/Categories';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import axios from 'axios';
const GET_CAT = `
{
	productCategories{
	  nodes{
		id
		name
		image{
		  sourceUrl
		}
		name
		children{
		  nodes{
			id
			name
			image{
		  sourceUrl
		}
		name
		  }
		}
	  }
	}
  }
`;

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
				query: GET_CAT
			}
		}).then((result) => {
			this.setState({ entries: result.data.data.productCategories.nodes });
			// console.log(result.data.data.productCategories.edges);
		});
	}
	updateSearch = (search) => {
		this.setState({ search });
	};
	_renderItem = ({ item, index }) => {
		return <CarC navigation={this.props.navigation} data={item} onPress={() => this.props.navigation.navigate('Details')} />;
	};

	render() {
		console.log(this.state);
		return (
			<View style={style.ViewStyle}>
				<HeaderC heading={'Products'} navigation={this.props.navigation} />
				<ScrollView style={{ flex: 1 }}>
					<SearchC />
					<View style={{ marginLeft: 15, marginRight: 15, marginTop: 10 }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										color: colors.color,
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
										color: colors.themeC,
										fontSize: 13,
										fontFamily: 'Montserrat-SemiBold'
									}}
									onPress={() => this.props.navigation.navigate('Detail')}
								>
									filter
								</Text>
							</View>
						</View>

						<FlatList  data={this.state.entries} renderItem={this._renderItem} numColumns={2} />
					</View>
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
export default Cate;
