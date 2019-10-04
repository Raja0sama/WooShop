import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Dimensions,ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import colors from '../../../../colors.json';
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
export default GetCat
