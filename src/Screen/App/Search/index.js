import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { HeaderC, SearchC } from '../../../component/index';
import SearchQuery from './GraphqlComponent/search'
import { connect } from 'react-redux'
import { ThemeColor as color } from '../../../colors'

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			entries: [1, 2, 1, 1, 1, 1, 1, 1, 1]
		};

		
	}
	componentDidMount(){
		this.setState({search:this.props.navigation.getParam('input', "")})

	}
	getInput = (input) =>{
		console.log(input)
		this.setState({search:input})
	}

	render() {
		console.log(this.state)
		return (
			<View style={style().ViewStyle}>
				<View style={{ backgroundColor: color.Primary, paddingBottom: 20 }} >
					<HeaderC navigation={this.props.navigation} />
					<SearchC return={this.getInput} self={true} />
				</View>
				{this.state.search && <SearchQuery input={this.state.search} />}
			</View>
		);
	}
}
const style = () => StyleSheet.create({
	ViewStyle: {
		backgroundColor: color.Primary,
		flex: 1
	}
});
const mapStateToProps = (state /*, ownProps*/) => {
	return {
		state: state
	}
}
export default connect(
	mapStateToProps)(Search);
