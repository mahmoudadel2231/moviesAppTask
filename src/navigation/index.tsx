// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SeeAllScreen from '../screens/SeeAllScreen';

type RootStackParamList = {
  Home: undefined;
  SeeAll: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="SeeAll" component={SeeAllScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
