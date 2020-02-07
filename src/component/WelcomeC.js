import React, { Component } from "react";
import { View,  Text} from "react-native";
import { Avatar } from "react-native-elements";



const WelcomeC = ({navigation,user}) => {
    return (
        <View style={{ marginLeft: 20,marginRight:20, marginTop: 10 }}>

        <View style={{ flexDirection: 'row' }}>

          <View style={{ flex: 1, height: 100 }} >
            <Text style={{
              color: color.PrimaryF,
              fontSize: 22,
              top: 8,
              fontFamily: "Montserrat-Light"
            }}>Welcome 🤘, </Text>
            <Text style={{
              color: color.PrimaryF,

              fontSize: 25,
              fontFamily: 'Montserrat-Bold'
            }}>{user== "" ? "": user.user.name.toUpperCase()}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row-reverse', height: 100 }} >
            <Avatar
              rounded
              size="large"
              source={user== "" ? (require('../../assets/profile.jpg')): {uri:user.user.avatar.url}}
            />
          </View>

        </View>
      </View>
    )
}
export default WelcomeC
