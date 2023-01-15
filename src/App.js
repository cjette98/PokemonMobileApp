// In App.js in a new project

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import redux from './redux/';
//THEME
import { themes } from './themes/themes'
//SCREENS
import Home from './screen/Home';
import PokemonDetails from './screen/PokemonDetails';
import MyFavorites from './screen/MyFavorites';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Favorites" component={MyFavorites} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={redux.store}>
      <PersistGate persistor={redux.persistor}>
        <PaperProvider theme={themes}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='MyTabs'  >
              <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
              <Stack.Screen name="PokemonDetails" component={PokemonDetails} options={{ title: 'Details' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
