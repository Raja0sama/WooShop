import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
import {Text, Layout} from '@ui-kitten/components';
import {useQuery} from '@apollo/react-hooks';
import {SliderBox} from 'react-native-image-slider-box';
import striptags from 'striptags';
import {singleProduct} from '../../../../Graphql/Actions/index';

import {useTheme} from '@ui-kitten/components';

let gal = '';
const setGal = p => {
  gal = p;
};
let a = '';
const GetProduct = props => {
  const theme = useTheme();

  var {height, width} = Dimensions.get('window');
  const style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
    },
    TextStyle: {
      fontFamily: 'Montserrat-Bold',
    },
    CStyle: {
      fontFamily: 'Montserrat-Bold',
    },
  });

  const {data, loading, error} = useQuery(singleProduct(props.query));
  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  if (error) return <Text>ERROR</Text>;
  const loop = () => {
    let str = '';
    for (let i = 0; i < Math.abs(data.product.averageRating); i++) {
      str += '⭐';
    }
    return <Text style={{fontFamily: 'Montserrat-Light'}}>{str}</Text>;
  };
  let gallery = [];
  gallery = data.product.galleryImages.nodes;
  gallery.unshift(data.product.image);
  gallery = gallery.map(element => {
    return element.sourceUrl;
  });
  setGal(gallery);
  const cat = data.product?.productCategories?.nodes.map(e => e.name);
  return (
    <View>
      <View style={{flex: 1, height: 400}} onLayout={onLayout}>
        <SliderBox
          images={gal.filter(onlyUnique)}
          sliderBoxHeight={400}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          parentWidth={width}
        />
      </View>
      <View style={{flex: 1, margin: 30, alignItems: 'center'}}>
        <Text h1 style={style.TextStyle}>
          ✔{data.product.name}{' '}
        </Text>
        {data.product.onSale ? (
          <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 23}}>
            🛒 Sale{' '}
          </Text>
        ) : (
          <View />
        )}
        {cat && <Text style={style.CStyle}>{cat.join(', ')} </Text>}
        <Text style={{fontFamily: 'Montserrat-Light'}}>
          {/* {data.product.price.replace('$', '💲')} */}
        </Text>
        {loop()}
        <Text style={{fontFamily: 'Montserrat-Light'}}>
          🔵{striptags(data.product.description)}
        </Text>
        <Text style={{fontFamily: 'Montserrat-Light'}}>
          🤞SKU :{striptags(data.product.sku)}
        </Text>
        {/* <Attributes options={data.product.attributes ? data.product.attributes.nodes : []} /> */}
        {data.product.purchaseNote ? (
          <Layout
            level="2"
            style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
            <Text style={{padding: 5, fontWeight: 'bold'}}>
              PURHCASE NOTE :{' '}
            </Text>
            <Text style={{padding: 5}}>{data.product.purchaseNote} </Text>
          </Layout>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

const onLayout = e => {
  a = {
    width: e.nativeEvent.layout.width,
  };
};
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export default GetProduct;
