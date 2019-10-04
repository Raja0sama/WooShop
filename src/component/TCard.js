import React, { Component  } from "react";
import { Text } from "react-native";
import colors from '../colors.json'
import LinearGradient from "react-native-linear-gradient";

class TCarC extends Component {
    constructor(props){
        super(props)
        this.state = {
          }
    }
   
    render(){
        const {a,Texts,width,radius} = this.props
        return (
            <LinearGradient
        colors={colors.gradientList[a]}
        style={{
          height: 80, width: width, justifyContent: 'center', alignItems: 'center', borderRadius: radius, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,

          elevation: 24,
        }}
        start={{ x: 1, y: 2 }}
        end={{ x: 0.1, y: 0.2 }}
      >
        <Text style={{
          fontSize: 14,
          color: 'white',
          fontWeight: 'bold'
        }}>{Texts}</Text>
      </LinearGradient>
        )
    }
}


export default TCarC