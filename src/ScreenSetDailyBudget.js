import React, {useState} from 'react';
import { Text, TextInput, View, Pressable, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './utils/styles';

// this screen is used for setting the daily budget amount/limit
function ScreenSetDailyBudget({ navigation, route }) {
  const [ dailyLimit, setDailyLimit ] = useState(0)
  let weekData = [
    {key: '1', day: 'Mon', expenseItems: [
                                          {category: 'lunch', amount: 11.90},
                                          {category: 'groceries', amount: 12.33}
                                        ]},
    {key: '2', day: 'Tue', expenseItems: [{category: 'lunch', amount: 9.19}]},
    {key: '3', day: 'Wed', expenseItems: [{category: 'lunch', amount: 11.90}]},
    {key: '4', day: 'Thu', expenseItems: []},
    {key: '5', day: 'Fri', expenseItems: []},
    {key: '6', day: 'Sat', expenseItems: []},
    {key: '7', day: 'Sun', expenseItems: []},
  ]

  // checking that daily spend limit is a valid number
  const checkAndSetDailyLimit = async (value) => {
    if (value < 0) {
      console.log("Can't set negative limits!")
      return
    } else if (value.includes('-')) {
      return
    } else if (value > 0) {
      try {
        await AsyncStorage.setItem('dailyLimit', value)
      } catch(error) {
        console.log('Virhe:', error)
      }
      setDailyLimit(value)
      console.log("Daily limit set to: ", value)
      try {
        await AsyncStorage.setItem('budgetData', weekData)
        console.log('ScreenSetDailyBudget budgetData set:', weekData)
      } catch (error) {
        console.log('ScreenSetDailyBudget setData budgetData error:', error)
      }
    }
  }

  const goToScreenMain = () => {
    navigation.navigate('ScreenMain', { dailyLimit: dailyLimit })
  }

  return (
    <View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
      <Text style={{fontSize: 40, textAlign: 'center'}}>Set Daily Budget</Text>
      <View style={{alignContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>Limit set to: {dailyLimit}</Text>
        <TextInput 
          style={{width: 200, margin: 10}}
          placeholder='amount' 
          onChangeText={(value) => checkAndSetDailyLimit(value)}
          keyboardType='numeric'
        />
      </View>
      <Pressable onPress={dailyLimit > 0 ? goToScreenMain : null}>
        <Text style={{textAlign: 'center'}}>Start Budgeting</Text>
      </Pressable>
    </View>
  )
}

export default ScreenSetDailyBudget
