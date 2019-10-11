import React from 'react'
import { View,Text } from 'react-native'
import colors from '../../../colors.json';
import LinearGradient from 'react-native-linear-gradient';



class Checkout extends React.Component{
    render(){
        return(
            <View>
                <LinearGradient
                 start={ {x: 1, y: 2} }
                 end={{ x: 0.1, y: 0.2 }}
                colors={colors.gredientB} style={{alignItems:'center',justifyContent:"center", margin:20,height:50,backgroundColor:colors.themeC,borderRadius:20}}>
                    
                    <Text style={{color:colors.rcolor,fontSize:25}}>
                        CHECKOUT
                    </Text>
                 </LinearGradient>

            </View>
        )
    }
}
export default Checkout