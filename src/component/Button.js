import React, { Component } from "react";
import {Button} from "react-native-elements"
import LinearGradient from "react-native-linear-gradient";
import { ThemeColor as color } from '../colors'

const ButtonC = ({onPress,Text}) => {
    return (
        <Button
        onPress={onPress}
       ViewComponent={LinearGradient} // Don't forget this!
       titleStyle={{fontFamily:'Montserrat-SemiBold',color:color.SecondaryF}}
       buttonStyle={{ borderRadius: 30, }}
       containerStyle={{marginTop:20}}
       rounded={true}
       linearGradientProps={{
         colors: [color.Secondary, color.Secondary],
         start: { x: 0.1, y: 0.2 },
         end: { x: 0.1, y: 0.2 }
       }}
       title={Text}
     />
    )
}
export default ButtonC