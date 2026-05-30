import React, {useState} from 'react';
import { Text, TextInput, View, Pressable, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './utils/styles';

// this screen is used for setting the daily budget amount/limit
function ScreenSetDailyBudget({ navigation, route }) {
  const [ dailyLimit, setDailyLimit ] = useState(0)
  
  let weekBudgetData = [
    {key: '1', day: 'Monday', expenseItems: []},
    {key: '2', day: 'Tuesday', expenseItems: []},
    {key: '3', day: 'Wednesday', expenseItems: []},
    {key: '4', day: 'Thursday', expenseItems: []},
    {key: '5', day: 'Friday', expenseItems: []},
    {key: '6', day: 'Saturday', expenseItems: []},
    {key: '7', day: 'Sunday', expenseItems: []},
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
        await AsyncStorage.setItem('NewDATA', JSON.stringify(weekBudgetData))
        console.log('ScreenSetDailyBudget budgetData set:', weekBudgetData)
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
          style={styles.textinput}
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
