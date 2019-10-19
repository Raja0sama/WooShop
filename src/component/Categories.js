import React, { Component ,Dimensions } from "react";
import { Text } from "react-native";
import colors from '../colors.json'
import LinearGradient from "react-native-linear-gradient";

class CarC extends Component {
    constructor(props){
        super(props)
        this.state = {
         
          }
    }
   
    render(){
      console.log()
        return (
            <LinearGradient
            colors={[populate('#'),populate('#')]}
            style={{
          height: 140, flex:1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          margin:4,
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
        }}>{this.props.data.node.name}</Text>
      </LinearGradient>
        )
    }
}

var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
  
function populate(a) {
  for ( var i = 0; i < 6; i++ ) {
    var x = Math.round( Math.random() * 14 );
    var y = hexValues[x];
    a += y;
  }
  return a;
}
export default CarC