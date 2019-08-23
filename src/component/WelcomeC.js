import React, { Component } from "react";
import { View,  Text} from "react-native";
import { Avatar } from "react-native-elements";
import colors from '../colors.json'



const WelcomeC = ({navigation}) => {
    return (
        <View style={{ marginLeft: 20,marginRight:20, marginTop: 10 }}>

        <View style={{ flexDirection: 'row' }}>

          <View style={{ flex: 1, height: 100 }} >
            <Text style={{
              color: colors.color,
              fontSize: 22,
              top: 8,
              fontFamily: "Montserrat-Light"
            }}>Welcome,</Text>
            <Text style={{
              color: colors.color,

              fontSize: 25,
              fontFamily: 'Montserrat-Bold'
            }}>Raja Osama</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row-reverse', height: 100 }} >
            <Avatar
              rounded
              size="large"

              source={require('../../assets/profile.jpg')}
            />
          </View>

        </View>
      </View>
    )
}
export default WelcomeC