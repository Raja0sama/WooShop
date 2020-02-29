import React, { Component } from "react";
import { Text, TouchableHighlight } from "react-native";
import { Layout, Button } from "@ui-kitten/components";

function TCarC (props){

    const { a, Texts, width, radius } = props
    return (

      
        <Button  style={{
            height: 80, width: width, justifyContent: 'center', alignItems: 'center', borderRadius: radius, shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            margin:10,
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,
          }}
          onPress={() => props.navigation.navigate('CatDetail', { data: props.data })}
          >
          {Texts}
        </Button>
        
    )
  }



export default TCarC