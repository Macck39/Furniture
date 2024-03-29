// import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react';
import Route from './Route';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
    <Route />
    </Provider>
   
  )
}

export default App