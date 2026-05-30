import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './utils/styles.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ScreenWelcome from './ScreenWelcome';
import ScreenSetDailyBudget from './ScreenSetDailyBudget.js';
import ScreenToday from './ScreenToday.js';
import ScreenSummary from './ScreenSummary';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()



// Main screen of the app holding Tab Navigation to Today and Summary pages
const ScreenMain = ({ navigation, route }) => {
  const { dailyLimit } = route.params
  const [ chosenBudgetingDay, setChosenBudgetingDay ] = useState('')
  const [ dailyLimitState, setDailyLimit ] = useState(0)

  const weekdays = [
    {key: 1, value: 'Monday'},
    {key: 2, value: 'Tuesday'},
    {key: 3, value: 'Wednesday'},
    {key: 4, value: 'Thursday'},
    {key: 5, value: 'Friday'},
    {key: 6, value: 'Saturday'},
    {key: 7, value: 'Sunday'},
  ]

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    try {
      AsyncStorage.getItem('dailyLimit').then(value => {
        if (value != null) {
          setDailyLimit(value)
        }
      })
    } catch (error) {
      console.log('App.js getData dailyLimit error:', error)
    }
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color}) => {
          // pass
        },
        header: () => null
      })}
      tabBarOptions={{
        activeBackgroundColor: '#f0f',
        inactiveBackgroundColor: '#999',
      }}
      initialRouteName="ScreenToday"
    >
      <Tab.Screen 
        name='ScreenToday' 
        options={{ title: 'Today' }}
        component={ScreenToday}
        initialParams={{ dailyLimit: dailyLimit, weekdays: weekdays }}
      />
      <Tab.Screen 
        name='ScreenSummary' 
        options={{ title: 'Summary' }}
        component={ScreenSummary}
        initialParams={{ dailyLimit: dailyLimit }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  /*
    Screens in Stack:
      1) ScreenWelcome shows in the beginning for 3 seconds (and only once)
      2) ScreenSetDailyBudget shows after ScreenWelcome and only once, asks for daily budget limit
      3) ScreenMain contains Tab Navigation to screens Today and Summary
  */
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ScreenWelcome" component={ScreenWelcome} />
        <Stack.Screen name="ScreenSetDailyBudget" component={ScreenSetDailyBudget} />
        <Stack.Screen name="ScreenMain" component={ScreenMain} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
