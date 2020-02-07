import React, { Component } from "react";
import { Text, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import { ThemeColor as color } from '../colors'
import GButton from "./GButton"
import striptags from "striptags"
import { withNavigation } from 'react-navigation';

class ICard extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { item } = this.props.data
    let a = Dimensions.get('screen').width;
    a = a - (a / 5)

    return (
      <Card
        containerStyle={{
          borderWidth: 0, shadowColor: "#000", marginBottom: 20, backgroundColor: color.PLight,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,
          width: a / 2,
          elevation: 14,
        }}
        image={{ uri: item.image.sourceUrl }}>
        <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: 'bold', fontFamily: 'Montserrat-Light', color: color.PrimaryF }}>
          {item.name}
        </Text>
        <Text style={{ marginBottom: 10, fontSize: 12, top: -5, fontFamily: 'Montserrat-Light', color: color.PrimaryF }}>
          {striptags(item.description.substring(0, 50)) + '...'}
        </Text>
        <GButton onPress={() => this.props.navigation.navigate('Single', { id: item.id, product: item.productId })} Text={item.price} />
      </Card>
    )
  }
}


export default withNavigation(ICard)
