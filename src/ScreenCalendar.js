import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './utils/styles';
import { Button } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ScreenCalendar({ navigation, route }) {
  const { dailyLimit, weekdays } = route.params
  const [ chosenBudgetingDay, setChosenBudgetingDay ] = useState('')
  const [ selected, setSelected ] = useState('')

  const saveChosenBudgetingDay = async(value) => {
    try {
      await AsyncStorage.setItem('chosenBudgetingDay', value)
      setChosenBudgetingDay(value)
      console.log("chosenBudgetingDay set to:", value)
    } catch(error) {
      console.log('Error in setting chosenBudgetingDay:', error)
    }
  }

  /*useEffect(() => {
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
      console.log('getData dailyLimit virhe:', error)
    }
  }*/

  return (
    <View>
      <View>
        <Text style={styles.top}>Calendar</Text>
      </View>
      <Text>Your daily budget is: {dailyLimit}</Text>
      <Text>Choose day</Text>
      <SelectList 
          setSelected={(val) => setSelected(val)} 
          data={weekdays} 
          save="value"
          onSelect={() => {
            saveChosenBudgetingDay(selected)
            //alert(selected)
          }}
      />
      <Text>You chose {chosenBudgetingDay}</Text>
      <Button title='confirm' onPress={() => saveChosenBudgetingDay(selected)} />
    </View>
  )
}

// <Button title='confirm' onPress={() => saveChosenBudgetingDay(selected)} />

export default ScreenCalendar
