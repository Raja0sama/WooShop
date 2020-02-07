import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {HeaderC,SearchC,ICard,TCarC} from '../../../component/index';


import AsyncStorage from '@react-native-community/async-storage';
import GetCat from './GraphQLComponent/Cat.js'
import GetPop from './GraphQLComponent/products.js'
import { connect } from 'react-redux'
import {ThemeColor as color } from '../../../colors'

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


	render() {
		var { height, width } = Dimensions.get('window');
		return (
			<View style={style().ViewStyle}>
				<View style={{backgroundColor:color.Primary,paddingBottom:20}} >
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
										color: color.PrimaryF,
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
										color: color.PrimaryF,
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

					{/* <Divider style={{ backgroundColor: color.PrimaryF, opacity: 0.1, marginTop: 20, marginBottom: 20 }} /> */}
					<GetPop navigation={this.props.navigation} orderby={0} render={this._renderItem1} />
					{/* <Divider style={{ backgroundColor: color.PrimaryF, opacity: 0.1, marginTop: 20, marginBottom: 20 }} /> */}
					<GetPop navigation={this.props.navigation} orderby={1} render={this._renderItem1} />
					{/* <Divider style={{ backgroundColor: color.PrimaryF, opacity: 0.1, marginTop: 20, marginBottom: 20 }} /> */}
					<GetPop navigation={this.props.navigation} orderby={2} render={this._renderItem1} />
					{/* <Divider style={{ backgroundColor: color.PrimaryF, opacity: 0.1, marginTop: 20, marginBottom: 20 }} /> */}
					<GetPop navigation={this.props.navigation} orderby={3} render={this._renderItem1} />

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
const mapStateToProps = (state /*, ownProps*/) => {
	return {
		state: state
	}
}
export default connect(
	mapStateToProps)(Home);
