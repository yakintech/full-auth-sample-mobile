import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import Main from './Main'
import { store } from './store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {

  return (<>
    <NavigationContainer>
      <Provider store={store}>
        <Main/>
      </Provider>
    </NavigationContainer>
  </>
  )
}

export default App