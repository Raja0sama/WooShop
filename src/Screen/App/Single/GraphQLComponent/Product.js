import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text, ActivityIndicator } from 'react-native';
import colors from '../../../../colors.json';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { SliderBox } from 'react-native-image-slider-box';
import striptags from 'striptags';
import Attributes from './attributes';
const GET_PRODUCT = (query) => gql`
query {
  product( id: "${query}") {
    id
    productId
    averageRating
    purchaseNote
    categories{
      nodes{
        name
        children{
          nodes{
            name
          }
        }
      }
    }
    price
    name
    sku
    date
    onSale
    description
    attributes{
      nodes{
        name
        options
        visible
      }
    }
    image{
      sourceUrl
    }
    galleryImages{
      nodes{
        sourceUrl
      }
    }
  }
}
`;

let gal = '';
const setGal = (p) => {
	gal = p;
};
let a = '';
const GetProduct = (props) => {
	const { data, loading, error } = useQuery(GET_PRODUCT(props.query));
	if (loading) return <ActivityIndicator size="large" color={colors.color} />;
	if (error) return <Text>ERROR</Text>;
	const loop = () => {
		let str = '';
		for (let i = 0; i < Math.abs(data.product.averageRating); i++) {
			str += '⭐';
		}
		return <Text style={{ fontSize: 22, fontFamily: 'Montserrat-Light', color: colors.color }}>{str}</Text>;
	};
	let gallery = [];
	gallery = data.product.galleryImages.nodes;
	gallery.unshift(data.product.image);
	gallery = gallery.map((element) => {
		return element.sourceUrl;
	});
	setGal(gallery);
	const cat = data.product.categories.nodes.map((e) => e.name);

	return (
		<View>
			<View style={{ flex: 1, height: 400, marginRight: 30, marginLeft: 30 }} onLayout={onLayout}>
				<SliderBox
					images={gal.filter( onlyUnique )}
					sliderBoxHeight={400}
					onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
					parentWidth={a.width}
				/>
			</View>
			<View style={{ flex: 1, margin: 30, alignItems: 'center' }}>
				<Text style={style.TextStyle}>✔{data.product.name} </Text>
				{data.product.onSale ? (
					<Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 23, color: colors.themeC }}>🛒 Sale </Text>
				) : (
					<View />
				)}
				<Text style={style.CStyle}>{cat.join(', ')} </Text>
				<Text style={{ fontSize: 22, fontFamily: 'Montserrat-Light', color: colors.color }}>
					{data.product.price.replace('$', '💲')}
				</Text>
				{loop()}
				<Text style={{ fontSize: 18, fontFamily: 'Montserrat-Light', color: colors.color }}>
					🔵{striptags(data.product.description)}
				</Text>
				<Text style={{ fontSize: 15, fontFamily: 'Montserrat-Light', color: colors.color }}>
					🤞SKU :{striptags(data.product.sku)}
				</Text>
				<Attributes options={data.product.attributes ? data.product.attributes.nodes : []} />
				{data.product.purchaseNote ? (
					<View style={{ backgroundColor: colors.themeC, flex: 1, marginLeft: 20, marginRight: 20 }}>
						<Text style={{ color: colors.rcolor, padding: 5, fontWeight: 'bold' }}>PURHCASE NOTE : </Text>
						<Text style={{ color: colors.rcolor, padding: 5 }}>{data.product.purchaseNote} </Text>
					</View>
				) : (
					<View />
				)}
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	ViewStyle: {
		backgroundColor: colors.background,
		flex: 1
	},
	TextStyle: {
		color: colors.color,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	},
	CStyle: {
		color: colors.color,
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
