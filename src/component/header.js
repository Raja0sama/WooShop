import { Header, Icon, Badge } from "react-native-elements";
import { View, StatusBar, Text } from "react-native";
import React, { Component } from "react";
import { connect } from 'react-redux'
import {ThemeColor as color } from '../colors'
import {DrawerActions } from 'react-navigation-drawer'
const HeaderC = ({ navigation, heading, Cart }, props) => {
  return (
    <View>
      <StatusBar backgroundColor={color.Primary} barStyle={color.stutsbarContent} />
      <Header

        containerStyle={{
          height: 40,
          backgroundColor: 'transparent',
          marginBottom: 20,
          justifyContent: 'space-around', borderBottomWidth: 0
        }}
        centerComponent={{ text: heading, style: { fontSize: 20, color: color.PrimaryF, fontFamily: 'Montserrat-Bold' } }}

        leftComponent={{
          icon: 'menu', color: color.SLight,
          onPress:()=>{navigation.dispatch(DrawerActions.openDrawer())}
        }}
        rightComponent={
          <View><Icon name='shoppingcart'
            type='antdesign'
            onPress={() => navigation.navigate('Cart')}
            color={color.SLight} />
            {Cart.cart.length != 0 ? (<Badge
              status="primary"
              onPress={() => navigation.navigate('Cart')}
              value={<Text style={{ fontSize: 10 }}>{Cart.cart ? Cart.cart.length : 0}</Text>}
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
            />) : (<View></View>)}
          </View>}
      />
    </View>
  )
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    Cart: state.Cart
  }
}
export default connect(
  mapStateToProps)(HeaderC);

// { icon: 'shopping-cart', color: color.SLight }