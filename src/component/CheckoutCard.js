import React, {Component, useState} from 'react';
import {View, Image, ScrollView, ActivityIndicator} from 'react-native';
import striptags from 'striptags';
import {connect} from 'react-redux';
import {Text, Input, Icon} from '@ui-kitten/components';

const CheckoutCard = ({data, ind, index, dispatch}) => {
  const [state, setstate] = useState(true);

  return (
    <View
      style={{
        height: 130,
        borderTopWidth: 0.1,
        borderBottomWidth: 0.1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
      }}>
      <View style={{width: 130}}>
        <Image
          source={{uri: data[1].image.sourceUrl}}
          style={{width: 130, height: 130}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 1, margin: 10}}>
          <ScrollView>
            <Text style={{fontSize: 22, fontFamily: 'Montserrat-Light'}}>
              {data[1].name}
            </Text>
            <Text style={{fontSize: 15, fontFamily: 'Montserrat-Light'}}>
              {striptags(data[1].description)}
            </Text>
          </ScrollView>
        </View>
        <View style={{height: 30, flexDirection: 'row'}}>
          <Input
            containerStyle={{width: 30}}
            style={{marginLeft: 20}}
            value={'' + ind.Q}
          />
          <Text style={{top: 5, left: 10, fontFamily: 'Montserrat-Light'}} />
          <View style={{flexDirection: 'row-reverse', flex: 1}}>
            <Text style={{top: 5, left: 10, fontFamily: 'Montserrat-Light'}}>
              {data[1].price}
              {' $' +
                parseInt(data[1].price.replace('$', '')) * parseInt(ind.Q)}
            </Text>
          </View>
        </View>
      </View>
      <Icon
        width={32}
        height={32}
        name={'close-circle-outline'}
        style={{position: 'absolute', top: 0, right: 4}}
        onPress={() => {
          setstate(false);
          dispatch({type: 'CART_DELETE', product: index});
        }}
      />
    </View>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    Cart: state.Cart.cart,
  };
};
export default connect(mapStateToProps)(CheckoutCard);
