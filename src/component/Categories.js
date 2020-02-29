import React, {  } from "react";
import { TouchableHighlight } from "react-native";

import {  Button } from "@ui-kitten/components";

function CarC(props) {



  return (
     
      <Button style={{
          height: 140, flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          margin: 4,
          shadowOpacity: 0.58,
          shadowRadius: 16.00,

          elevation: 24,
        }}
        onPress={() => props.navigation.navigate('CatDetail', { data: props.data })}
      >
      {props.data.name}
      </Button>
  )
}



export default CarC