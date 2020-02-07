import React, { createContext } from 'react';
import AppNavigator from './navigator/stack';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import AsyncStorage from '@react-native-community/async-storage';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData: {
	  __schema: {
		types: []
	  }
	}
  });
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  fragmentMatcher,
  
});

persistCache({
	cache,
	storage: AsyncStorage,
  });


const client = new ApolloClient({
	uri: 'https://eproject.tk/graphql',
	cache,

});

class App extends React.Component {
	constructor(props) {
		super(props);
	}



	render() {
		return (
			<Provider store={store}>
				{/* Apollo for graphQL */}
				<ApolloProvider client={client}>
					{/* App Navigation  */}
					<AppNavigator />
				</ApolloProvider>
			</Provider>
		);
	}
}
export default App;
