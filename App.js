import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Decks from './components/Decks'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <Decks />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
