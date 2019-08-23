import React, { Component  } from "react";
import { Text,Dimensions  } from "react-native";
import {  Card,Button } from "react-native-elements";
import colors from '../colors.json'
import LinearGradient from "react-native-linear-gradient";
import GButton from "./GButton"
class CarC extends Component {
    constructor(props){
        super(props)
        this.state = {
         
          }
    }
   
    render(){
      let a = Dimensions.get('screen').width;
        a =  a - (a / 5) 
      
        return (
            <Card 
            containerStyle={{borderWidth:0,shadowColor: "#000",marginBottom:20,backgroundColor:colors.rcolor,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            width:a/2,
            elevation: 14,}}
            image={require('../../assets/bg.jpg')}>
            <Text style={{marginBottom: 10,fontSize:13,fontFamily:'Montserrat-Light',color:colors.color}}>
              The idea with React Native Elements is mor.
            </Text>
           <GButton onPress={this.props.onPress} Text="BUY"/>
          </Card>
        )
    }
}


export default CarC