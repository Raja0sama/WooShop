import React, { Component } from "react";
import {Button} from "react-native-elements"
import LinearGradient from "react-native-linear-gradient";
import colors from '../colors.json'

const ButtonC = ({onPress,Text}) => {
    return (
        <Button
        onPress={onPress}
       ViewComponent={LinearGradient} // Don't forget this!
       titleStyle={{fontFamily:'Montserrat-SemiBold',color:colors.rcolor}}
       buttonStyle={{ borderRadius: 30, }}
       containerStyle={{marginTop:20}}
       rounded={true}
       linearGradientProps={{
         colors: [colors.color, colors.color],
         start: { x: 0.1, y: 0.2 },
         end: { x: 0.1, y: 0.2 }
       }}
       title={Text}
     />
    )
}
export default ButtonC