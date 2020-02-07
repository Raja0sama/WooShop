import React, {  } from 'react';
import { Dimensions, View, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import {categories} from '../../../../Graphql/Actions/index'

const GetCat = (props) => {
	var { height, width } = Dimensions.get('window');
	const { data, loading, error } = useQuery(categories);
	if (loading) return <View />
	if (error) return <p>ERROR</p>;

	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			legacyImplementation={false}
			data={data.productCategories.nodes}
		renderItem={props.render}
		/>
	)
}
export default GetCat
