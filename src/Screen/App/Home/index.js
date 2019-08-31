import React, { Component } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Divider, Button, Header, Icon, SearchBar, Avatar } from 'react-native-elements';
import colors from '../../../colors.json';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import HeaderC from '../../../component/header';
import SearchC from '../../../component/Search';
import WelcomeC from '../../../component/WelcomeC';
import CarC from '../../../component/ICard';
import TCarC from '../../../component/TCard';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AsyncStorage from '@react-native-community/async-storage';

const GET_CAT = gql`
{
   productCategories{
    edges {
      node {
        id
        name
        image{
          uri
        }
      }
    }
  }
}
`;
const GetCat = (props) =>{
	var { height, width } = Dimensions.get('window');
	const { data, loading, error } = useQuery(GET_CAT);
	if (loading) return <ActivityIndicator size="large" color={colors.color} />;
	if (error) return <p>ERROR</p>;
	console.log(props)
	return (<Carousel
		ref={(c) => {
			this._carousel = c;
		}}
		data={data.productCategories.edges}
		renderItem={props.render}
		sliderWidth={width}
		itemWidth={150}
		activeSlideAlignment={'start'}
		inactiveSlideScale={1}
		inactiveSlideOpacity={1}
	/>)
}
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			entries: [ 1, 2, 3, 4, 5, 6, 7 ],
			user : ""
		};
		this._bootstrapAsync();
	}
	_bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
		console.log(JSON.parse(userToken));
		this.setState({user:JSON.parse(userToken)})
  };

	updateSearch = (search) => {
		this.setState({ search });
	};
	_renderItem({ item, index }) {
		const a = index;
		console.log(item)
		return <TCarC a={a} width={140} radius={7} Texts={item.node.name} />;
	}
	_renderItem1({ item, index }) {
		return <CarC />;
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
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										color: colors.color,
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
										color: colors.themeC,
										fontSize: 13,
										fontFamily: 'Montserrat-SemiBold'
									}}
									onPress={() => {
										AsyncStorage.removeItem('userToken')
										AsyncStorage.removeItem('user')

									}}
								>
									more
								</Text>
							</View>
						</View>

						<GetCat render={this._renderItem}/>
					</View>
					<Divider style={{ backgroundColor: colors.color, marginTop: 20, marginBottom: 20 }} />

					<View style={{ marginLeft: 20, marginRight: 20 }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										color: colors.color,
										fontSize: 18,
										fontFamily: 'Montserrat-SemiBold'
									}}
								>
									Most Popular
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
									more
								</Text>
							</View>
						</View>

						<Carousel
							ref={(c) => {
								this._carousel = c;
							}}
							data={this.state.entries}
							renderItem={this._renderItem1}
							sliderWidth={width}
							itemWidth={200}
							activeSlideAlignment={'start'}
							inactiveSlideScale={1}
							inactiveSlideOpacity={1}
						/>
					</View>
					<Divider style={{ backgroundColor: colors.color, marginTop: 20, marginBottom: 20 }} />

					<View style={{ marginLeft: 20, marginRight: 20 }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										color: colors.color,
										fontSize: 18,
										fontFamily: 'Montserrat-SemiBold'
									}}
								>
									Most Popular
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
									more
								</Text>
							</View>
						</View>

						<Carousel
							ref={(c) => {
								this._carousel = c;
							}}
							data={this.state.entries}
							renderItem={this._renderItem1}
							sliderWidth={width}
							itemWidth={200}
							activeSlideAlignment={'start'}
							inactiveSlideScale={1}
							inactiveSlideOpacity={1}
						/>
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
export default Home;
