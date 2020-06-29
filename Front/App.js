import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import RootComponent from './stacks/RootComponent';


/**
 * Déclaration des custom fonts
 */
let customFonts = {
  'Sen-Bold': require('./assets/fonts/Sen-Bold.ttf'),
  'Sen-Regular': require('./assets/fonts/Sen-Regular.ttf')
}

export default class App extends React.Component {

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts)
    this.setState({ fontsLoaded: true })
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render(){
    if (this.state.fontsLoaded) {
      let persistor = persistStore(Store)
      return (
        <View style={{flex:1}}>
          
          <StatusBar hidden={true} />
          
          <Provider store={Store}>
            <PersistGate persistor={persistor}>
              <NavigationContainer>
                <RootComponent />
              </NavigationContainer>
            </PersistGate>
          </Provider>

        </View>
      )
    } else {
      return <AppLoading />
    }
  }
}
