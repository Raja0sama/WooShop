import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { HeaderC, SearchC } from '../../../component/index';
import SearchQuery from './GraphqlComponent/search'
import { connect } from 'react-redux'
import { Layout } from '@ui-kitten/components';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			entries: [1, 2, 1, 1, 1, 1, 1, 1, 1]
		};

		
	}
	componentDidMount(){
		this.setState({search:this.props.route.params?.input ?? ""})

	}
	getInput = (input) =>{
		
		this.setState({search:input})
	}
	style =  StyleSheet.create({
		ViewStyle: {
			flex: 1
		}
	});
	render() {
		return (
			<Layout style={this.style.ViewStyle}>
				<View style={{ backgroundColor: "transparent", paddingBottom: 20 }} >
					<HeaderC navigation={this.props.navigation} />
					<SearchC return={this.getInput} self={true} />
				</View>
				{this.state.search && <SearchQuery input={this.state.search} />}
			</Layout>
		);
	}
}
const mapStateToProps = (state /*, ownProps*/) => {
	return {
		state: state
	}
}
export default connect(
	mapStateToProps)(Search);
