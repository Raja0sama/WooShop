import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, ScrollView, FlatList, Text, Animated } from 'react-native';
import {} from 'react-native-elements';
import colors from '../../../colors.json';
import HeaderC from '../../../component/header';
import SearchC from '../../../component/Search';
import CarC from '../../../component/ICard';
import GetProducts from './GraphQLComponent/Product';
function Item(data, index,state) {

	const datas = data.data;
	return (
		<TouchableOpacity onPress={() => data.update(data.data.text,data.index)} key={index}>
			<View
				style={{
					backgroundColor: datas.backgroundColor,
					borderColor: datas.borderColor,
					paddingTop: 7,
					paddingBottom: 7,
					paddingLeft: 16,
					paddingRight: 16,
					marginRight: 7,
					borderWidth: 1,
					borderRadius: 25,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text
					style={{
						color: datas.textColor,
						paddingRight: 7,
						fontSize: 12,
						fontWeight: 'bold'
					}}
				>
					{data.data.text.toUpperCase()}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
const DATA = [
	{
		text: 'England',
		textColor: colors.rcolor,
		backgroundColor: colors.themeC,
		borderColor: colors.rcolor
	},
	{
		text: 'Australia',
		textColor: colors.themeC,
		backgroundColor: colors.rcolor,
		borderColor: colors.themeC
	},
	{
		text: 'Indonesian',
		textColor: colors.themeC,
		backgroundColor: colors.rcolor,
		borderColor: colors.themeC
	},
	{
		text: 'USA',
		textColor: colors.themeC,
		backgroundColor: colors.rcolor,
		borderColor: colors.themeC
	},
	{
		text: 'Canada',
		textColor: colors.themeC,
		backgroundColor: colors.rcolor,
		borderColor: colors.themeC
	},
	{
		text: 'Spain',
		textColor: colors.themeC,
		backgroundColor: colors.rcolor,
		borderColor: colors.themeC
	}
];

class CatDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			cart: true,
			entries: [ 1, 2, 3, 4, 5, 6, 7 ],
			data:this.props.navigation.getParam('data', null)
		};
		// this.setState({data:this.props.navigation.getParam('data', null)});
	}
	componentDidMount(){
		const cate = []
		
		this.state.data.children.nodes.forEach((e,i)=>{
			if(i == 0){
				this.setState({where: e.name})
				cate.push({
					text: e.name,
					textColor: colors.rcolor,
					backgroundColor: colors.themeC,
					borderColor: colors.rcolor
				})
			}else{
				cate.push({
					text: e.name,
					textColor: colors.themeC,
					backgroundColor: colors.rcolor,
					borderColor: colors.themeC
				})
			}
	
		})
		this.setState({cate})
	}
	updateSearch = (search) => {
		this.setState({ search });
	};
	_renderItem({ item, index }) {
		return <CarC key={Math.random()} data={{ item, index }} />;
	}
	update = (name,index)=> {
		console.log(index)
		this.setState({where: name})
		const cate = []
		
		this.state.data.children.nodes.forEach((e,i)=>{
			if(i == index){
				this.setState({where: e.name})
				cate.push({
					text: e.name,
					textColor: colors.rcolor,
					backgroundColor: colors.themeC,
					borderColor: colors.rcolor
				})
			}else{
				cate.push({
					text: e.name,
					textColor: colors.themeC,
					backgroundColor: colors.rcolor,
					borderColor: colors.themeC
				})
			}
	
		})
		this.setState({cate})
	}

	render() {
		console.log(this.state);
		return (
			<View style={style.ViewStyle}>
				<HeaderC heading={'Products'} navigation={this.props.navigation} />
				<ScrollView style={{ flex: 1 }}>
					<SearchC />
					<FlatList
						style={{ marginTop: 10 }}
						horizontal={true}
						data={this.state.cate}
						renderItem={({ item , index}) => <Item index={index} update={this.update} data={item} />}
						keyExtractor={(item) => item.id}
						showsHorizontalScrollIndicator={false}
					/>

					<GetProducts title={this.state.data.name.toUpperCase()} orderby={this.state.where} render={this._renderItem} />
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

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16
	},
	title: {
		fontSize: 32
	}
});

export default CatDetail;
