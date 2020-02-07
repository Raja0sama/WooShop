import React, { Component, useState } from 'react';
import { View,  ScrollView,FlatList,Text,ActivityIndicator } from 'react-native';
import { Input ,Image,Badge, Icon } from 'react-native-elements';
import striptags from 'striptags';
import {connect } from 'react-redux'
import { ThemeColor as color } from '../colors'


const CheckoutCard = ({data,ind,index,dispatch}) => {
    const [state, setstate] = useState(true);
 
    return (
        <View style={{height:130,borderTopWidth:0.1,borderBottomWidth:0.1,borderColor:color.PrimaryF,flexDirection:"row",marginTop:10,marginBottom:5}}>
        <View style={{width:130}}>
        <Image
           source={{ uri: data[1].image.sourceUrl }}
           style={{ width: 130, height: 130 }}
           PlaceholderContent={<ActivityIndicator />}
           />          
         </View>
        <View style={{flex:1}}>
            <View style={{flex:1,margin:10}}>
                <ScrollView>
                <Text style={{fontSize:22,fontFamily: 'Montserrat-Light',color:color.PrimaryF}}>
                    {data[1].name}
            </Text>
            <Text style={{fontSize:15,fontFamily: 'Montserrat-Light',color:color.PrimaryF}}>
                    {striptags(data[1].description)}
             </Text>
                    </ScrollView>
          
            </View>
        <View style={{height:30,flexDirection:"row"}}>
           
           <Input containerStyle={{width:30}}
           inputContainerStyle={{width:30,height:25}}
           inputStyle={{color:color.PrimaryF}}
           value={''+ind.Q}
           />
            <Text style={{fontSize:16,top:5,left:10,fontFamily: 'Montserrat-Light',color:color.PrimaryF}}>
                   Quantity
            </Text>
            <View style={{flexDirection:"row-reverse",flex:1}}>

            <Text style={{fontSize:16,top:5,left:10,fontFamily: 'Montserrat-Light',color:color.PrimaryF}}>
            {data[1].price}{" T $"+parseInt(data[1].price.replace('$',''))*parseInt(ind.Q)}
            </Text>
            
            </View>
        </View>

        </View>
        <Badge
               status="error"
               containerStyle={{padding:5}}
               value={<Icon  name='close'
               type='evilicon'
               color='white'></Icon>
                   }
               containerStyle={{ position: 'absolute', top: 0, right: 4 }}
               onPress={()=> {
                setstate(false)   
                dispatch({type:'CART_DELETE',product:index})
            }}
           />
       </View>
    )
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
        Cart : state.Cart.cart
	}
}
export default connect(
	mapStateToProps  )(CheckoutCard);
