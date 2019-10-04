import CarC from '../../../../component/ICard';
import React, { Component } from 'react';
import { View,Dimensions,StyleSheet,Text,ActivityIndicator } from 'react-native';
import colors from '../../../../colors.json';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { SliderBox } from 'react-native-image-slider-box';
import striptags from "striptags"

const GET_PRODUCT = (query) => gql`
query {
  product( id: "${query}") {
    id
    productId
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
    date
    description
    attributes{
      nodes{
        name
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
const GetProduct = (props) =>{
  var { height, width } = Dimensions.get('window');
	const { data, loading, error } = useQuery(GET_PRODUCT(props.query));
	if (loading) return <ActivityIndicator size="large" color={colors.color} />;
  if (error) return <Text>ERROR</Text>;

  gallery = []
  let gallery = data.product.galleryImages.nodes
  gallery.unshift(data.product.image)
  gallery = gallery.map(element => {
  return element.sourceUrl
  });
  const cat = data.product.categories.nodes.map((e)=> e.name)
  console.log(data)

	return (
    <View>
					<View style={{ flex: 1, height: 400, marginRight: 30, marginLeft: 30 }} onLayout={this.onLayout}>

						<SliderBox
							images={gallery}
							sliderBoxHeight={400}
							onCurrentImagePressed={index =>
								console.warn(`image ${index} pressed`)
							}
							parentWidth={props.width}
						/>
					</View>
					<View style={{ flex: 1, margin: 30, alignItems: "center" }}>
						<Text style={style.TextStyle}>✔{data.product.name} </Text>
						<Text style={style.CStyle}>{cat.join(', ')} </Text>
						<Text style={{ fontSize: 22, fontFamily: 'Montserrat-Light', color: colors.color }}>
            {data.product.price.replace('$','💲')}
        </Text>
						<Text style={{ fontSize: 18, fontFamily: 'Montserrat-Light', color: colors.color }}>
          🔵{striptags(data.product.description)}
        </Text>

					</View>
          </View>
        )
}

const style = StyleSheet.create({
	ViewStyle: {
		backgroundColor: colors.background,
		flex: 1
	}, TextStyle: {
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
export default GetProduct
query {
  product( id: "cHJvZHVjdDo3Nw==") {
    id
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
		productId
    name
    date
    description
    shortDescription
    sku
    stockStatus
    onSale
    purchaseNote
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