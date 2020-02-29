// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Drawer,
  DrawerHeaderFooter,
  Icon,
  Layout,
  Button
} from '@ui-kitten/components';

// import styles from './SideMenu.style';
// import { ActivityIndicator } from 'react-native'
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
	 DrawerContentScrollView,
} from '@react-navigation/drawer';
import * as RootNavigation from '../RootNavigation.js';
import { withStyles } from '@ui-kitten/components';
import { useDispatch } from 'react-redux'




const Header = (props) => (
  <DrawerHeaderFooter
    title={props.user.user.name}
    description={props.user.user.email}
    icon={()=>   <Image
      style={{width: 50, height: 50}}
      source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
    /> }
  />
);
const drawerData = [
  { title: 'Home', route:'Home' },
  { title: 'Profile' , route:'Home' },
  { title: 'Cart' , route:'Cart' },
  { title: 'Categories' , route:'Cate' },
  { title: 'Theme', route:'Settings'  },
];

const onRouteSelect = async (index) => {
  
  const route = drawerData[index];
  // navigate with React Navigation
  if(route.route == "logout"){
    await AsyncStorage.removeItem('userToken')
    RootNavigation.navigate('Auth');
  }else{
  RootNavigation.navigate(route.route);
  }

};
function SideMenu(props) {
	const dispatch = useDispatch()



	return (
	  <DrawerContentScrollView contentContainerStyle={{flex:1}} {...props}>
      <Layout style={{flex:1}} >
      <Drawer
        data={drawerData}
        header={()=> <Header user={props.user}/>}
        onSelect={onRouteSelect}
      />
      <Button onPress={async()=>{
        await AsyncStorage.removeItem('userToken')
        dispatch({ type: 'LOGOUTUSER' });

        // RootNavigation.navigate('Auth');
      }}>
        LogOut
      </Button>
      </Layout>
     
  	  </DrawerContentScrollView>
	);
  }





  export default SideMenu
  


// class SideMenu extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       user: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgPD5W4KoZ_eREGOQeXqxBxNOo1BdrVAmIjDhgpNZ4elGaz_wr"
//     }
//   }
//   componentDidMount() {
//     AsyncStorage.getItem('userToken').then(res => {
//       this.setState({ user: JSON.parse(res).user.avatar.url })
//       console.log(this.state.user)
//     })
//   }
//   navigateToScreen = (route) => () => {
//     const navigateAction = NavigationActions.navigate({
//       routeName: route
//     });
//     this.props.navigation.dispatch(navigateAction);
//   }

//   render() {

//     const list = [
//       {
//         title: 'Profile',
//         icon: 'user',
//       },
//       {
//         title: 'Categories',
//         icon: 'unread',
//         onPress : () => this.props.navigation.navigate('Cate')

//       },
//       {
//         title: 'Settings',
//         icon: 'tools',
//         onPress : () => this.props.navigation.navigate('Settings')
//       },

//     ]

//     return (
//       <View style={styles().container}>
//         {/* <View style={{ flex: 1, }}>
//           <View style={{ justifyContent: 'center', alignItems: 'center' }}>

//             <Avatar
//               source={{ uri: this.state.user ? this.state.user : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgPD5W4KoZ_eREGOQeXqxBxNOo1BdrVAmIjDhgpNZ4elGaz_wr" }}
//               style={{ width: 200, height: 200 }}
//               PlaceholderContent={<ActivityIndicator />}
//               rounded
//             />
//           </View>

//           {
//             list.map((item, i) => (
//               <ListItem
//                 containerStyle={{ backgroundColor: "transparent" }}
//                 titleStyle={{ color: color.SLight, }}
//                 key={i}
//                 title={item.title}
//                 onPress = {item.onPress}
//                 chevron
//               />
//             ))
//           }
//         </View>
//         <ListItem
//           title={"Log out"}
//           titleStyle={{ color: color.SLight, }}

//           containerStyle={{ backgroundColor: color.BtnG[0] }}
          
//           onPress={() => 		{AsyncStorage.removeItem('userToken')
//           this.props.navigation.navigate('Login')}}
//           chevron
//         /> */}
//       </View>
//     );
//   }
// }

// SideMenu.propTypes = {
//   navigation: PropTypes.object
// };
