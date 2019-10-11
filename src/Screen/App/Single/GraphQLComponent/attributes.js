import React from 'react';
import { View, Text, Picker } from 'react-native';
import { Divider  } from 'react-native-elements';
import colors from '../../../../colors.json';

export default class Atributes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false
		};
	}
	render() {
		return (
			<View>
				{this.props.options.map((e) => e.visible ? (
                    <View><Text
					style={{
						color: colors.color,
						fontSize: 17,
						fontFamily: 'Montserrat-Bold'
					}}
				>
					Atribute Name : {e.name}
				</Text>
					<Text style={{
                        color: colors.color,
						fontSize: 17,
						fontFamily: 'Montserrat-Light'
                    }}>
                    {e.options.join(', ')}
                    </Text>
                    <Divider style={{ backgroundColor: 'blue' }} />
                    </View>
				) : (<View/>))}
			</View>
		);
	}
}
