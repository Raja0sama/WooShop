import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { View } from 'react-native';
import { ThemeColor as color } from '../colors'
import { ListItem, Avatar } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { DrawerActions } from 'react-navigation-drawer'
import AsyncStorage from '@react-native-community/async-storage';

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgPD5W4KoZ_eREGOQeXqxBxNOo1BdrVAmIjDhgpNZ4elGaz_wr"
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userToken').then(res => {
      this.setState({ user: JSON.parse(res).user.avatar.url })
      console.log(this.state.user)
    })
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {

    const list = [
      {
        title: 'Profile',
        icon: 'user',
      },
      {
        title: 'Categories',
        icon: 'unread',
        onPress : () => this.props.navigation.navigate('Cate')

      },
      {
        title: 'Settings',
        icon: 'tools',
        onPress : () => this.props.navigation.navigate('Settings')
      },

    ]

    return (
      <View style={styles().container}>
        <View style={{ flex: 1, }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>

            <Avatar
              source={{ uri: this.state.user ? this.state.user : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgPD5W4KoZ_eREGOQeXqxBxNOo1BdrVAmIjDhgpNZ4elGaz_wr" }}
              style={{ width: 200, height: 200 }}
              PlaceholderContent={<ActivityIndicator />}
              rounded
            />
          </View>

          {
            list.map((item, i) => (
              <ListItem
                containerStyle={{ backgroundColor: color.Primary }}
                titleStyle={{ color: color.SLight, }}
                key={i}
                title={item.title}
                onPress = {item.onPress}
                chevron
              />
            ))
          }
        </View>
        <ListItem
          title={"Log out"}
          titleStyle={{ color: color.SLight, }}

          containerStyle={{ backgroundColor: color.BtnG[0] }}
          
          onPress={() => 		{AsyncStorage.removeItem('userToken')
          this.props.navigation.navigate('Login')}}
          chevron
        />
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};
export default withNavigation(SideMenu)