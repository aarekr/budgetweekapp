import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './utils/styles';

function ScreenToday({ navigation, route }) {
  const { dailyLimit, weekdays } = route.params
  const [ chosenBudgetingDay, setChosenBudgetingDay ] = useState('')
  const [ budgetData, setBudgetData ] = useState(0)
  const [ selected, setSelected ] = useState('')

  const [ expense, setExpense ] = useState('')
  const [ category, setCategory ] = useState('')

  useEffect(() => {
    getBudgetingDayData()
    getDATA()
  }, [])

  const getBudgetingDayData = () => {
    try {
      AsyncStorage.getItem('chosenBudgetingDay').then(value => {
        if (value != null) {
          setChosenBudgetingDay(value)
        }
      })
    } catch (error) {
      console.log('getData virhe:', error)
    }
  }

  const getDATA = async () => {
    console.log('ScreenToday getting DATA')
    try {
      await AsyncStorage.getItem('DATA').then(value => {
        if (value != null) {
          let data = JSON.parse(value)
          console.log('getDATA data:', data)
          /*data.map((item) => {
            console.log('item:', item.day, item.expenseItems)
          })*/
          setBudgetData(data)
          console.log('data after set:', budgetData)
        }
      })
    } catch (error) {
      console.log('getDATA error:', error)
    }
  }

  const countTodaysTotalExpenses = () => {
    let todaysTotalExpenses = 0
    if (chosenBudgetingDay) {
      for (let i=0; i<7; i++) {
        if (budgetData[i]['day'] == chosenBudgetingDay) {
          for (let j=0; j<budgetData[i]['expenseItems'].length; j++) {
            todaysTotalExpenses += budgetData[i]['expenseItems'][j]['amount']
          }
        }
      }
    }
    return todaysTotalExpenses
  }

  const addExpense = async () => {
    console.log('adding a new expense')
    console.log('expense :', expense)
    console.log('category:', category)
    if (expense <= 0) {
      alert('Expenses must be over 0')
    } else {
      try {
        console.log('Budgeting for', chosenBudgetingDay)
        console.log('ScreenToday budgetData:', budgetData)
        //console.log('ScreenToday budgetData[MON]:', budgetData[0]['expenseItems'])
        for (let i=0; i<7; i++) {
          if (budgetData[i]['day'] == chosenBudgetingDay) {
            let updatedExpenseItems = budgetData[i]['expenseItems'].concat(
              {'category': category, 'amount': Number(expense)}
            )
            budgetData[i]['expenseItems'] = updatedExpenseItems
            console.log('silmukka budgetData:', budgetData)
            await AsyncStorage.setItem('DATA', JSON.stringify(budgetData))
            console.log('awaitin jälkeen')
            setExpense('')
            setCategory('')
            setTimeout(() => {
              console.log('starting to get DATA')
              getDATA()
              console.log('passed getting  DATA')
            }, 1000)
            //break
          }
        }
        //console.log('ScreenToday budgetData[UPD]:', budgetData[0]['expenseItems'])
        //console.log('ScreenToday budgetData[cBD]:', budgetData[chosenBudgetingDay])
      } catch (error) {
        console.log('error occurred in setting expense:', error)
      }
    }
  }

  const saveChosenBudgetingDay = async(value) => {
    try {
      await AsyncStorage.setItem('chosenBudgetingDay', value)
      setChosenBudgetingDay(value)
      console.log("chosenBudgetingDay set to:", value)
    } catch(error) {
      console.log('Error in setting chosenBudgetingDay:', error)
    }
  }

  return (
    <View>
      <Text style={styles.top}>{chosenBudgetingDay}</Text>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 20}}>Today's expenses so far: {countTodaysTotalExpenses()}</Text>
        <Text>Add a new expense below</Text>
        <TextInput 
          style={{width: 100, borderColor: 'blue', margin: 10}}
          placeholder='expense amount' 
          onChangeText={(value) => {setExpense(value)}}
          value={expense}
          keyboardType='numeric'
        />
        <TextInput 
          style={{width: 100, borderColor: 'blue', margin: 10}}
          placeholder='choose expense category' 
          onChangeText={(value) => {setCategory(value)}}
          value={category}
        />
        <View style={{marginBottom: 50}}>
          <Button title='Add expense' color='green' onPress={addExpense} />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
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
      </View>
    </View>
  )
}

export default ScreenToday
