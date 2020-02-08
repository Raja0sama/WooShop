import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux'
import GetProducts from './GraphQLComponent/Product'
import { ThemeColor as color } from '../../../colors'
import {HeaderC} from '../../../component/index';


let total = 0
class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0
        }
    }
    MakeTotal = (amount) => {
        total = amount
    }
    style =  StyleSheet.create({
        ViewStyle: {
            backgroundColor: color.Primary,
            flex: 1
        },
        TextStyle: {
            color: color.PrimaryF,
            fontSize: 30,
            fontFamily: 'Montserrat-Bold'
        }
    });
    render() {

        return (
            <View style={this.style.ViewStyle}>
                <View style={{ backgroundColor: color.Primary, paddingBottom: 20 }} >
                    <HeaderC navigation={this.props.navigation} />
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <Text style={{ fontSize: 32, marginLeft: 20, fontFamily: 'Montserrat-Bold', color: color.PrimaryF }}>
                        Check Out
                </Text>
                    <GetProducts MakeTotal={this.MakeTotal} Cart={this.props.Cart.cart} />
                </ScrollView>
                <View
                    style={{
                        height: 40,
                        backgroundColor: color.Primary,
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
                            backgroundColor: color.Primary
                        }}
                    >
                        <Text style={{ color: color.PrimaryF, fontWeight: 'bold', fontSize: 20 }}>
                            {total}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: color.BtnG[0],
                            borderTopRightRadius: 30,
                            borderBottomLeftRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}

                    >
                        <Text onPress={() => this.props.navigation.navigate('Checkout')} style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15 }}>
                            Procced to Checkout
                    </Text>
                    </View>
                </View>
            </View>)
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        Cart: state.Cart
    }
}
export default connect(
    mapStateToProps)(Cart);
