import React, { Component } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Card, Divider, Button, Header, Icon, SearchBar, Avatar } from 'react-native-elements';
import colors from '../../../colors.json';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import HeaderC from '../../../component/header';
import SearchC from '../../../component/Search';
import WelcomeC from '../../../component/WelcomeC';
import CarC from '../../../component/ICard';
import TCarC from '../../../component/TCard';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			entries: [ 1, 2, 3, 4, 5, 6, 7 ]
		};
	}
	updateSearch = (search) => {
		this.setState({ search });
	};
	_renderItem({ item, index }) {
		const a = index;

		return <TCarC a={a} width={140} radius={7} Texts={'HurraH'} />;
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
					<WelcomeC />
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
							renderItem={this._renderItem}
							sliderWidth={width}
							itemWidth={150}
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
