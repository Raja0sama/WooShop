import React from 'react';
import { View,Dimensions,StyleSheet,Text,ActivityIndicator } from 'react-native';
import {CheckBox} from 'react-native-elements'
import colors from '../../../../colors.json';

export default class Atributes extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            checked : false
        }
    }
    render(){
        const data  = ['black', 'blue' , 'Yello']
        return(
            <View>
	<Text style={{		color: colors.color,
		fontSize: 17,
        fontFamily: 'Montserrat-Bold'}}>
        Name Colors
         </Text>
{
    data.map((e)=>{
        <CheckBox
        title={e}
        checked={this.state.checked}
        onPress={() => this.setState({checked: !this.state.checked})}
        />
    })
}
<CheckBox
  title='Click Here'
  checked={this.state.checked}
  onPress={() => this.setState({checked: !this.state.checked})}
/>
            </View>
        )
    }
}