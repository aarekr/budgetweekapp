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
  const [ selectedDay, setSelectedDay ] = useState('')
  const [ selectedCategory, setSelectedCategory ] = useState('')

  const [ expense, setExpense ] = useState('')
  const [ category, setCategory ] = useState('')

  const expenseCategories = ['Beer', 'Clothes', 'Food', 'Lunch', 'Transport']

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
      console.log('ScreenToday getData error:', error)
    }
  }

  const getDATA = async () => {
    try {
      await AsyncStorage.getItem('DATA').then(value => {
        if (value != null) {
          let data = JSON.parse(value)
          setBudgetData(data)
        }
      })
    } catch (error) {
      console.log('ScreenToday getDATA error:', error)
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
    return todaysTotalExpenses.toFixed(2)
  }

  // adding an expense to total expenses
  const addExpense = async () => {
    if (expense <= 0) {
      alert('Expenses must be over 0')
    } else {
      try {
        for (let i=0; i<7; i++) {
          if (budgetData[i]['day'] == chosenBudgetingDay) {
            let updatedExpenseItems = budgetData[i]['expenseItems'].concat(
              {'category': selectedCategory, 'amount': Number(expense)}
            )
            budgetData[i]['expenseItems'] = updatedExpenseItems
            await AsyncStorage.setItem('DATA', JSON.stringify(budgetData))
            setExpense('')
            setCategory('')
            setTimeout(() => {
              getDATA()
            }, 1000)
          }
        }
      } catch (error) {
        console.log(' ScreenToday error occurred in setting expense:', error)
      }
    }
  }

  const saveChosenBudgetingDay = async(value) => {
    try {
      await AsyncStorage.setItem('chosenBudgetingDay', value)
      setChosenBudgetingDay(value)
    } catch(error) {
      console.log('ScreenToday error in setting chosenBudgetingDay:', error)
    }
  }

  return (
    <View>
      <Text style={styles.top}>{chosenBudgetingDay}</Text>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 30}}>Today's expenses so far: {countTodaysTotalExpenses()}</Text>
        <Text>Add a new expense below</Text>
        <TextInput 
          style={{width: 100, borderColor: 'blue', margin: 10}}
          placeholder='expense amount' 
          onChangeText={(value) => {setExpense(value)}}
          value={expense}
          keyboardType='numeric'
        />
        <SelectList 
          setSelected={(val) => setSelectedCategory(val)} 
          data={expenseCategories} 
          save="value"
          onSelect={() => {
            setSelectedCategory(selectedCategory)
          }}
        />
        <View style={{marginTop: 5, marginBottom: 50}}>
          <Button title='Add expense' color='green' onPress={addExpense} />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Choose day</Text>
        <SelectList 
          setSelected={(val) => setSelectedDay(val)} 
          data={weekdays} 
          save="value"
          onSelect={() => {
            saveChosenBudgetingDay(selectedDay)
          }}
        />
        <Text style={{marginTop: 10}}>You chose {chosenBudgetingDay}</Text>
      </View>
    </View>
  )
}

export default ScreenToday
