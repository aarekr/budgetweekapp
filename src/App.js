import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  ScrollView, 
  RefreshControl, 
  FlatList,
  TextInput,
  TouchableHighlight,
  Pressable,
  Modal,
} from 'react-native';

import { ImageBackground } from 'react-native-web';
import StartBudgetingButton from './StartBudgetingButton';
import styles from './utils/styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ScreenWelcome from './ScreenWelcome';
import ScreenSetDailyBudget from './ScreenSetDailyBudget.js';
import ScreenToday from './ScreenToday.js';
import ScreenCalendar from './ScreenCalendar.js';
import ScreenSummary from './ScreenSummary';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()



// Main screen of the app holding Tab Navigation to Today, Calendar, and Summary pages
const ScreenMain = ({ navigation, route }) => {
  const { dailyLimit } = route.params
  const [ chosenBudgetingDay, setChosenBudgetingDay ] = useState('')
  //const [ dailyLimit, setDailyLimit ] = useState(0)

  const weekdays = [
    {key: 1, value: 'Monday'},
    {key: 2, value: 'Tuesday'},
    {key: 3, value: 'Wednesday'},
    {key: 4, value: 'Thursday'},
    {key: 5, value: 'Friday'},
    {key: 6, value: 'Saturday'},
    {key: 7, value: 'Sunday'},
  ]

  // budget data with categories
  let weekData = [
    {key: '1', day: 'Monday', expenseItems: []},
    {key: '2', day: 'Tuesday', expenseItems: []},
    {key: '3', day: 'Wednesday', expenseItems: []},
    {key: '4', day: 'Thursday', expenseItems: []},
    {key: '5', day: 'Friday', expenseItems: []},
    {key: '6', day: 'Saturday', expenseItems: []},
    {key: '7', day: 'Sunday', expenseItems: []},
  ]

  const [ budgetData, setBudgetData ] = useState(weekData)

  useEffect(() => {
    //setData()
    getData()
  }, [])

  const setData = async() => {
    try {
      await AsyncStorage.setItem('DATA', JSON.stringify(weekData))
      console.log('App budgetData set:', budgetData)
    } catch (error) {
      console.log('setData budgetData error:', error)
    }
  }

  const getData = () => {
    try {
      AsyncStorage.getItem('dailyLimit').then(value => {
        if (value != null) {
          setDailyLimit(value)
        }
      })
    } catch (error) {
      console.log('getData dailyLimit virhe:', error)
    }
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color}) => {
          let iconName;
          /*if (route.name === 'ScreenSummary') {
            size = focused ? 25 : 20;
            color = focused ? '#f0f' : '#555';
          }*/
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
        //options={{ header: () => null }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  const [showWarningModal, setShowWarningModal] = useState(false)

  /*
    Screens in Stack:
      1) ScreenWelcome shows in the beginning for 3 seconds (and only once)
      2) ScreenSetDailyBudget shows after ScreenWelcome and only once
      3) ScreenMain contains Tab Navigation to screens Today, Calendar and Summary
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
