import React, { Component } from "react";
import { View,Text } from "react-native";
import { SearchBar, Overlay } from "react-native-elements";
import { ThemeColor as color } from '../colors'
import { withNavigation } from 'react-navigation'
class SearchC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      isVisible: true

    }
  }
  updateSearch = search => {
    this.setState({ search });
  };

  onsub = e => {
    if(this.props.self == true){
      this.props.return(this.state.search)
    }else{

      this.props.navigation.navigate('Search',{input : this.state.search})
    }
  }

  render() {
    const { search } = this.state;
    return (
      <View>
        {/* <SearchQuery/> */}
        <SearchBar
          containerStyle={{
            shadowColor: color.PrimaryF,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            backgroundColor: color.Primary,
            elevation: 3, borderWidth: 0.1, marginLeft: 10, marginRight: 10, height: 45, borderRadius: 30, borderColor: color.PrimaryF
          }}
          onSubmitEditing={this.onsub}
          inputContainerStyle={{ height: 50, borderWidth: 0, top: -10 }}
          placeholder="Type Here..."
          placeholderTextColor={color.PrimaryF}
          onChangeText={this.updateSearch}
          inputStyle={{ fontSize: 15, padding: 0, margin: 0, color: color.PrimaryF }}
          searchIcon={{ size: 20, color: color.PrimaryF }}
          cancelIcon={{ color: color.PrimaryF }}
          clearIcon={{ color: color.PrimaryF }}
          value={search}
          platform={"android"}
        />
     
      </View>
    )
  }
}


export default withNavigation(SearchC)