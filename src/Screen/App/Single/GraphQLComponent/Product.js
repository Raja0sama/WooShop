import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { SliderBox } from 'react-native-image-slider-box';
import striptags from 'striptags';
import { ThemeColor as color } from '../../../../colors'
import { singleProduct } from '../../../../Graphql/Actions/index'




let gal = '';
const setGal = (p) => {
	gal = p;
};
let a = '';
const GetProduct = (props) => {
	var { height, width } = Dimensions.get('window');

	const { data, loading, error } = useQuery(singleProduct(props.query));
	if (loading) return <ActivityIndicator size="large" color={color.PrimaryF} />;
	if (error) return <Text>ERROR</Text>;
	const loop = () => {
		let str = '';
		for (let i = 0; i < Math.abs(data.product.averageRating); i++) {
			str += '⭐';
		}
		return <Text style={{ fontSize: 22, fontFamily: 'Montserrat-Light', color: color.PrimaryF }}>{str}</Text>;
	};
	let gallery = [];
	gallery = data.product.galleryImages.nodes;
	gallery.unshift(data.product.image);
	gallery = gallery.map((element) => {
		return element.sourceUrl;
	});
	setGal(gallery);
	const cat = data.product.productCategories.nodes.map((e) => e.name);

	return (
		<View>
			<View style={{ flex: 1, height: 400, }} onLayout={onLayout}>
				<SliderBox
					images={gal.filter(onlyUnique)}
					sliderBoxHeight={400}
					onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
					parentWidth={width}
				/>
			</View>
			<View style={{ flex: 1, margin: 30, alignItems: 'center' }}>
				<Text style={style.TextStyle}>✔{data.product.name} </Text>
				{data.product.onSale ? (
					<Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 23, color: color.PrimaryF }}>🛒 Sale </Text>
				) : (
						<View />
					)}
				<Text style={style.CStyle}>{cat.join(', ')} </Text>
				<Text style={{ fontSize: 22, fontFamily: 'Montserrat-Light', color: color.PrimaryF }}>
					{data.product.price.replace('$', '💲')}
				</Text>
				{loop()}
				<Text style={{ fontSize: 18, fontFamily: 'Montserrat-Light', color: color.PrimaryF }}>
					🔵{striptags(data.product.description)}
				</Text>
				<Text style={{ fontSize: 15, fontFamily: 'Montserrat-Light', color: color.PrimaryF }}>
					🤞SKU :{striptags(data.product.sku)}
				</Text>
				{/* <Attributes options={data.product.attributes ? data.product.attributes.nodes : []} /> */}
				{data.product.purchaseNote ? (
					<View style={{ backgroundColor: color.BtnG[1], flex: 1, marginLeft: 20, marginRight: 20 }}>
						<Text style={{ color: color.SecondaryF, padding: 5, fontWeight: 'bold' }}>PURHCASE NOTE : </Text>
						<Text style={{ color: color.SecondaryF, padding: 5 }}>{data.product.purchaseNote} </Text>
					</View>
				) : (
						<View />
					)}
			</View>
		</View>
	);
};

const style = () => StyleSheet.create({
	ViewStyle: {
		backgroundColor: color.Primary,
		flex: 1
	},
	TextStyle: {
		color: color.PrimaryF,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	},
	CStyle: {
		color: color.PrimaryF,
		fontSize: 17,
		fontFamily: 'Montserrat-Bold'
	}
});
const onLayout = (e) => {
	a = {
		width: e.nativeEvent.layout.width
	};
};
function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}
export default GetProduct;
