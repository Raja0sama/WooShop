import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import colors from '../../../colors.json';
import HeaderC from '../../../component/header';
import SearchC from '../../../component/Search';
import WelcomeC from '../../../component/WelcomeC';
import CarC from '../../../component/ICard';
import TCarC from '../../../component/TCard';
import AsyncStorage from '@react-native-community/async-storage';
import GetCat from './GraphQLComponent/Cat.js'
import GetPop from './GraphQLComponent/Popular.js'
import {connect } from 'react-redux'
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
	_renderItem = ({ item, index })=> {
		const a = index;
		return <TCarC data={item} navigation={this.props.navigation} a={a} width={140} radius={7} Texts={item.name} />;
	}
	_renderItem1({ item, index }) {
		return <CarC   data={{ item, index }} />;
	}


	render() {
		var { height, width } = Dimensions.get('window');
		return (
			<View style={style.ViewStyle}>
				<HeaderC navigation={this.props.navigation} />
				<ScrollView style={{ flex: 1 }}>
					<SearchC />
					<WelcomeC user={this.state.user} />
					<View style={{ marginLeft: 20, marginRight: 20 }}>
						<View style={{ flexDirection: 'row', marginBottom: 20 }}>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										color: colors.color,
										fontSize: 18,
										fontFamily: 'Montserrat-SemiBold'
									}}
									onPress={()=>console.log("Hey")							}
								>
									Categories
								</Text>
							</View>

							<View style={{ flexDirection: 'row-reverse' }}>
								<Text
									style={{
										color: colors.themeC,
										fontSize: 13,
										fontFamily: 'Montserrat-SemiBold'
									}}
									onPress={() => {
										AsyncStorage.removeItem('userToken')
										this.props.navigation.navigate('Cate');
									}}
								>
									more
								</Text>
							</View>
						</View>

						<GetCat render={this._renderItem} />
					</View>
					<Divider style={{ backgroundColor: colors.color,opacity:0.1, marginTop: 20, marginBottom: 20 }} />
					<GetPop navigation={this.props.navigation} orderby={0} render={this._renderItem1} />
					<Divider style={{ backgroundColor: colors.color,opacity:0.1, marginTop: 20, marginBottom: 20 }} />
					<GetPop navigation={this.props.navigation} orderby={1}  render={this._renderItem1} />
					<Divider style={{ backgroundColor: colors.color,opacity:0.1, marginTop: 20, marginBottom: 20 }} />
					<GetPop navigation={this.props.navigation} orderby={2}  render={this._renderItem1} />
					<Divider style={{ backgroundColor: colors.color,opacity:0.1, marginTop: 20, marginBottom: 20 }} />
					<GetPop navigation={this.props.navigation} orderby={3}  render={this._renderItem1} />

				
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
const mapStateToProps = (state /*, ownProps*/) => {
	console.log(state)
	return {
		state : state
	}
	}
export default connect(
	mapStateToProps  )(Home);
