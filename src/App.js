import React from 'react';
import AppNavigator from './navigator/stack';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux';
import {StatusBar, PlatformColor, Appearance} from 'react-native';
import store from './Redux/Store';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import {
  ApplicationProvider,
  IconRegistry,
  useTheme,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light, dark} from '@eva-design/eva';
// import { default as dark } from './custom-theme.json'; // <-- Import app theme
import {ThemeContext} from './theme-context';

const themes = {light, dark};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
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
  uri: 'https://wooshop.tk/graphql',
  cache,
});

const App = () => {
  const [theme, setTheme] = React.useState(Appearance.getColorScheme());
  const currentTheme = themes[theme];

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  const themee = useTheme();

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          <StatusBar
            backgroundColor={
              theme == 'light' ? 'white' : currentTheme['color-basic-800']
            }
            barStyle={theme == 'light' ? 'dark-content' : 'light-content'}
          />

          <Provider store={store}>
            {/* Apollo for graphQL */}
            <ApolloProvider client={client}>
              {/* App Navigation  */}
              <NavigationContainer ref={navigationRef}>
                <AppNavigator />
              </NavigationContainer>
            </ApolloProvider>
          </Provider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </React.Fragment>
  );
};

export default App;
