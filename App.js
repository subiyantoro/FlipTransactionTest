/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from "react-redux";
import store from "./src/configs/store";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import Router from "./src/configs/router";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App;
