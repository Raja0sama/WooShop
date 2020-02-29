import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import GetProducts from './GraphQLComponent/Product'
import { HeaderC } from '../../../component/index';
import { Layout, Text, useTheme } from '@ui-kitten/components';


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
    style = StyleSheet.create({
        ViewStyle: {
            flex: 1
        },
        TextStyle: {
            fontSize: 30,
            fontFamily: 'Montserrat-Bold'
        }
    });


    Footer = () => {
        const theme = useTheme();

        return (
            <View
                style={{
                    height: 40,
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
                    }}
                >
                  
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: theme['color-danger-800'],
                        borderTopRightRadius: 30,
                        borderBottomLeftRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}

                >
                    <Text onPress={() => this.props.navigation.navigate('Checkout')} style={{ fontFamily: 'Montserrat-Bold', fontSize: 15 }}>
                        Procced to Checkout
    </Text>
                </View>
            </View>
        )
    }

    render() {

        return (
            <Layout style={this.style.ViewStyle}>
                <HeaderC navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1 }}>
                    <Text h2 style={{ marginLeft: 20, fontFamily: 'Montserrat-Bold', }}>
                        Check Out
                </Text>
                    <GetProducts MakeTotal={this.MakeTotal} Cart={this.props.Cart.cart} />
                </ScrollView>
               <this.Footer/>
            </Layout>)
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        Cart: state.Cart
    }
}
export default connect(
    mapStateToProps)(Cart);
