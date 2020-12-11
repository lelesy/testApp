import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import {StyleSheet, SafeAreaView, View, Alert, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import  { HomeScreen, DetailsScreen, SettingsScreen }  from './src/screens';
Icon.loadFont();

const LogoItem = () => {
  return(
    <View style={styles.logoContainer}>
      <Text style={styles.logoTitle}>Главная</Text>
      <Icon name="home" size={25} color="black"/>
    </View>
  )
}


const App = () => {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  
  const HomeStack = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    )
   
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'skyblue',
          inactiveTintColor: 'gray'
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            if(route.name === 'Home'){
              iconName= 'home'
            }else if(route.name === 'Settings'){
              iconName ='gear'
            }
            return(
              <Icon name={iconName} color={color} size={size} />
            )
          }
        })}
      >
        <Tab.Screen name={'Home'} component={HomeStack}/>
        <Tab.Screen name={'Settings'} component={SettingsScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default App;
