import { StatusBar } from 'expo-status-bar'
import React from 'react';
import { StyleSheet, View } from 'react-native'
import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { red, white } from './utils/colors'
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants';

const Stack = createStackNavigator();

const RouteConfigs = {
  Decks:{
    name: 'Decks',
    component: Decks,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='card' size={30} color={tintColor} />, title: 'Decks'}
  },
  AddDeck:{
    component: AddDeck,
    name: 'Add Deck',
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck'}
  },
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? red : white,
    style: {
      height: Platform.OS === 'ios' ? 80 : 56,
      backgroundColor: Platform.OS === 'ios' ? white : red,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tab = Platform.OS === 'ios'
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator()

const Tabs = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...RouteConfigs['Decks']} />
      <Tab.Screen {...RouteConfigs['AddDeck']} />
  </Tab.Navigator>
)

const MainNav = () => (
    <Stack.Navigator headerMode='screen'>
        <Stack.Screen
            name='Home'
            component={Tabs}
            options={{headerShown: false}}/>
        <Stack.Screen
            name='DeckDetail'
            component={DeckDetail}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: red,
                }
            }}/>
    </Stack.Navigator>
)

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <NavigationContainer>
            <CustomStatusBar backgroundColor={red} barStyle="light-content"/>
            <MainNav />
        </NavigationContainer>
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
