//Main

import 'react-native-gesture-handler';
import * as React from 'react';

//Navigation

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


//Redux logic

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './state/store';

//Common ground

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome5, EvilIcons } from '@expo/vector-icons';



//Screens

import OffersScreen from './screens/OffersScreen'
import CombosScreen from './screens/CombosScreen'
import BeveragesScreen from './screens/BeveragesScreen'
import MenuScreen from './screens/MenuScreen'
import SettingsScreen from './screens/SettingsScreen'
import UserScreen from './screens/UserScreen'
import PickupScreen from './screens/PickupScreen'
import CouponsScreen from './screens/CouponsScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const UserStack = () =>{
  return(
    <Stack.Navigator>
        
        <Stack.Screen 
          name='SettingsStack' 
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#38A3A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name='User' 
          component={UserScreen}
          options={{
            title: 'Perfil',
            headerStyle: {
              backgroundColor: '#22577A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen 
          name="Offers" 
          component={OffersScreen} 
          options={{
            headerShown: false,
            tabBarLabel: "Promos",
            tabBarIcon: () => <MaterialIcons name="local-offer" size={24} color="black" />
          }}
        />
        <Tab.Screen 
          name="Combos" 
          component={CombosScreen} 
          options={{
            headerShown: false,
            tabBarLabel: "Combos",
            tabBarIcon: () => <Ionicons name="fast-food-outline" size={24} color="black" />
          }}
        />
        <Tab.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{
            headerShown: false,
            tabBarLabel: "Menú",
            tabBarIcon: () => <MaterialIcons name="menu-book" size={24} color="black" />
          }}
        />
        <Tab.Screen 
          name="Beverages" 
          component={BeveragesScreen} 
          options={{
            headerShown: false,
            tabBarLabel: "Bebidas",
            tabBarIcon: () => <MaterialIcons name="local-drink" size={24} color="black" />
          }}
        />
        <Tab.Screen 
          name="Pickup" 
          component={PickupScreen} 
          options={{
            headerShown: false,
            tabBarLabel: "Pickup",
            tabBarIcon: () => <Entypo name="location-pin" size={24} color="black" />
          }}
        />
      </Tab.Navigator>
  );
}

export default function App() {
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Root">
            <Drawer.Screen name="Restaurante" component={Tabs} />
            <Drawer.Screen name="Mi perfil" component={UserStack} />
            <Drawer.Screen name="Cupones" component={CouponsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
