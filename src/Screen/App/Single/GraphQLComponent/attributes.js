import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components'

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
						fontSize: 17,
						fontFamily: 'Montserrat-Bold'
					}}
				>
					Atribute Name : {e.name}
				</Text>
					<Text style={{
						fontSize: 17,
						fontFamily: 'Montserrat-Light'
                    }}>
                    {e.options.join(', ')}
                    </Text>
                    </View>
				) : (<View/>))}
			</View>
		);
	}
}
