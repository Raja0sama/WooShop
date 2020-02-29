import React, { Component } from 'react';
import { Dimensions, FlatList, View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import {searchQuery} from '../../../../Graphql/Actions/index'
import { ICard } from '../../../../component/index'

const _renderItem = ({ item, index }) => {
    return <ICard key={Math.random()} data={{ item, index }} />;
}
const SearchQuery = (props) => {

  const { data, loading, error } = useQuery(searchQuery(props.input));
  if (loading) return <View />
  if (error){
      
    return <Text>ERROR</Text>};
  
  const items = data.products.nodes
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
     
          <FlatList
        data={items}
        renderItem={_renderItem}
        numColumns={2}
        />
    </View>
  )
}

export default SearchQuery
