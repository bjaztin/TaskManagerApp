import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Splash, OnBoarding, BottomTab, Register,LogIn, VideoPreviewScreen} from './src/screens';

const Stack = createNativeStackNavigator();

const App = () =>{

  return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Splash" >
 
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="VideoPreviewScreen" component={VideoPreviewScreen} />
        
        </Stack.Navigator>
      </NavigationContainer>

  );
}

export default App
