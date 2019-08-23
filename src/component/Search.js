import React, { Component  } from "react";
import {  } from "react-native";
import {  SearchBar } from "react-native-elements";
import colors from '../colors.json'

class SearchC extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
         
          }
    }
    updateSearch = search => {
        this.setState({ search });
      };
    render(){
        const { search } = this.state;

        return (
            <SearchBar
            containerStyle={{
              shadowColor: colors.color,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              backgroundColor: colors.background,
              elevation: 3, borderWidth: 0.1, marginLeft: 10, marginRight: 10, height: 45,  borderRadius: 30, borderColor: colors.color
            }}
            inputContainerStyle={{ height: 50, borderWidth: 0, top: -10 }}
            placeholder="Type Here..."
            placeholderTextColor={colors.color}
            onChangeText={this.updateSearch}
            inputStyle={{ fontSize: 15, padding: 0, margin: 0, color: colors.color }}
            searchIcon={{ size: 20, color: colors.color }}
            cancelIcon={{ color: colors.color }}
            clearIcon={{ color: colors.color }}
            value={search}
            platform={"android"}
          />
        )
    }
}


export default SearchC