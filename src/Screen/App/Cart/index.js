import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import colors from '../../../colors.json';
import HeaderC from '../../../component/header';
import CheckoutCard from '../../../component/CheckoutCard';
import {connect } from 'react-redux'
import GetProducts from './GraphQLComponent/Product'

class Cart extends React.Component {
   
    render(){
        console.log(this.props.Cart)
        return(
            <View style={style.ViewStyle}>
            <HeaderC navigation={this.props.navigation} />
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ fontSize: 32, marginLeft: 20, fontFamily: 'Montserrat-Bold', color: colors.color }}>
                    Check Out
                </Text>
                <GetProducts Cart={this.props.Cart} />
            </ScrollView>
            <View
                style={{
                    height: 40,
                    backgroundColor: colors.background,
                    borderTopRightRadius: 30,
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.background
                    }}
                >
                    <Text style={{ color: colors.color, fontWeight: 'bold', fontSize: 20 }}>$231,2.0</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.themeC,
                        borderTopRightRadius: 30,
                        borderBottomLeftRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15 }}>
                        Procced to Checkout
                    </Text>
                </View>
            </View>
        </View>)
    }
}
const style = StyleSheet.create({
	ViewStyle: {
		backgroundColor: colors.background,
		flex: 1
	},
	TextStyle: {
		color: colors.color,
		fontSize: 30,
		fontFamily: 'Montserrat-Bold'
	}
});
const mapStateToProps = (state /*, ownProps*/) => {
	console.log(state)
	return {
        Cart : state.Cart.cart
	}
}
export default connect(
	mapStateToProps  )(Cart);
