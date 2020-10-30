import React from 'react';
import {StyleSheet, Dimensions, Image} from 'react-native';
import striptags from 'striptags';
import {withNavigation} from '@react-navigation/compat';
import {Card, Text, Button} from '@ui-kitten/components';

export const CustomHeader = ({item}) => {
  // console.log(item.item.name)
  return (
    <React.Fragment>
      <Image
        style={styles.headerImage}
        source={{uri: item.item.image.sourceUrl}}
      />
      <Text style={styles.headerText} category="h6">
        {item.item.name}
      </Text>
    </React.Fragment>
  );
};
export const Footer = ({item, onPress}) => {
  return (
    <React.Fragment>
      <Button onPress={onPress} style={{flex: 1}}>
        {item.item.price}
      </Button>
    </React.Fragment>
  );
};

function ICard(props) {
  const {item} = props.data;
  let a = Dimensions.get('screen').width;
  a = a - a / 6;

  return (
    <Card
      status={'info'}
      style={{
        padding: 0,
        borderWidth: 0,
        shadowColor: '#000',
        margin: 10,
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        width: a / 2,
        elevation: 14,
      }}
      header={() => <CustomHeader item={props.data} />}
      footer={() => (
        <Footer
          onPress={() =>
            props.navigation.navigate('Single', {
              id: item.id,
              product: item.productId,
            })
          }
          item={props.data}
        />
      )}>
      <Text>{striptags(item.description.substring(0, 50)) + '...'}</Text>
    </Card>
    // <Card
    //   containerStyle={{
    //     borderWidth: 0, shadowColor: "#000", marginBottom: 20, backgroundColor: color.PLight,
    //     shadowOffset: {
    //       width: 0,
    //       height: 7,
    //     },
    //     shadowOpacity: 0.41,
    //     shadowRadius: 9.11,
    //     width: a / 2,
    //     elevation: 14,
    //   }}
    //   image={{ uri: item.image.sourceUrl }}>
    //   <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: 'bold', fontFamily: 'Montserrat-Light', color: color.PrimaryF }}>
    //     {item.name}
    //   </Text>
    //   <Text style={{ marginBottom: 10, fontSize: 12, top: -5, fontFamily: 'Montserrat-Light', color: color.PrimaryF }}>
    //     {striptags(item.description.substring(0, 50)) + '...'}
    //   </Text>
    //   <GButton onPress={() => props.navigation.navigate('Single', { id: item.id, product: item.productId })} Text={item.price} />
    // </Card>
  );
}

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 10,
    marginVertical: 16,
  },
  headerImage: {
    flex: 1,
    height: 192,
  },
});

export default withNavigation(ICard);
