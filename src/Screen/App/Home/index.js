import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {HeaderC,SearchC,ICard,TCarC} from '../../../component/index';


import AsyncStorage from '@react-native-community/async-storage';
import GetCat from './GraphQLComponent/Cat.js'
import GetPop from './GraphQLComponent/products.js'
import { connect } from 'react-redux'
import { Layout,Text } from '@ui-kitten/components';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			user: "",
			entries: [1, 2, 1, 1, 1, 1, 1, 1, 1]
		};
		this._bootstrapAsync();
	}
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');
		this.setState({ user: JSON.parse(userToken) })
	};

	updateSearch = (search) => {
		this.setState({ search });
	};
	_renderItem = ({ item, index }) => {
		const a = index;
		return <TCarC data={item} navigation={this.props.navigation} a={a} width={140} radius={7} Texts={item.name} />;
	}
	_renderItem1({ item, index }) {
		return <ICard data={{ item, index }} />;
	}
	 style =  StyleSheet.create({
		ViewStyle: {
			flex: 1
		}
	});

	render() {
		var { height, width } = Dimensions.get('window');
		return (
			<Layout style={this.style.ViewStyle}>
				<View style={{paddingBottom:20}} >
					<HeaderC navigation={this.props.navigation} />
					<SearchC  />
				</View>
				<ScrollView style={{ flex: 1 }}>

					<View style={{ marginTop: 20 }}>
						<View style={{ flexDirection: 'row', marginBottom: 20 }}>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										marginLeft:20,
										fontSize: 18,
										fontFamily: 'Montserrat-SemiBold'
									}}
								>
									Categories
								</Text>
							</View>

							<View style={{ flexDirection: 'row-reverse' }}>
								<Text
									style={{
										marginRight:20,
										fontSize: 13,
										fontFamily: 'Montserrat-SemiBold'
									}}
									onPress={() => {
										// AsyncStorage.removeItem('userToken')
										this.props.navigation.navigate('Cate');
									}}
								>
									more
								</Text>
							</View>
						</View>

						<GetCat render={this._renderItem} />
					</View>
					<View style={{marginTop:20}}>

					<GetPop navigation={this.props.navigation} orderby={0} render={this._renderItem1} />
					<GetPop navigation={this.props.navigation} orderby={1} render={this._renderItem1} />
					<GetPop navigation={this.props.navigation} orderby={2} render={this._renderItem1} />
					<GetPop navigation={this.props.navigation} orderby={3} render={this._renderItem1} />

					</View>

				</ScrollView>
			</Layout>
		);
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		state: state
	}
}
export default connect(
	mapStateToProps)(Home);
