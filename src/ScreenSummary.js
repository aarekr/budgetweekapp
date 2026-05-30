import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './utils/styles';
import { DataTable } from 'react-native-paper'
import countDailySpend from './functions'

function ScreenSummary({ navigation, route }) {
  const { dailyLimit } = route.params
  const [ budgetData, setBudgetData ] = useState('')
  const [ summaryByDays, setSummaryByDays ] = useState(false)
  const [ summaryByCategories, setSummaryByCategories ] = useState(false)

  const compareToDailyBudget = (dayExpenses) => {
    if (dayExpenses > dailyLimit)
      return "OVER BUDGET!!!"
    return "OK"
  }

  useEffect(() => {
    getDATA()
  }, [])

  const getDATA = async () => {
    try {
      await AsyncStorage.getItem('NewDATA').then(value => {
        if (value != null) {
          let data = JSON.parse(value)
          setBudgetData(data)
        }
      })
    } catch (error) {
      console.log('ScreenSummary getDATA error:', error)
    }
  }

  const getSummaryByDays = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <DataTable style={{padding: 15, width: '80%'}}>
          <DataTable.Header style={{padding: 15}}>
            <DataTable.Title>DAY</DataTable.Title>
            <DataTable.Title>SPEND</DataTable.Title>
            <DataTable.Title>STATUS</DataTable.Title>
          </DataTable.Header>
          {
            budgetData
              ? budgetData.map((item) => 
                  <DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.day}</DataTable.Cell>
                    <DataTable.Cell>{countDailySpend(item.expenseItems).toFixed(2)}</DataTable.Cell>
                    <DataTable.Cell>{compareToDailyBudget(countDailySpend(item.expenseItems))}</DataTable.Cell>
                  </DataTable.Row>
                )
              : null
          }
        </DataTable>
      </View>
    )
  }

  const getCategoriesAndSpends = () => {
    let categoriesAndAmounts = [
      {category: 'Beer', amount: 0},
      {category: 'Clothes', amount: 0},
      {category: 'Food', amount: 0},
      {category: 'Lunch', amount: 0},
      {category: 'Transport', amount: 0},
    ]

    for (let i=0; i<7; i++) {
      for (let j=0; j<budgetData[i].expenseItems.length; j++) {
        if (budgetData[i].expenseItems[j].category == 'Beer')
          categoriesAndAmounts[0].amount += budgetData[i].expenseItems[j].amount
        else if (budgetData[i].expenseItems[j].category == 'Clothes')
          categoriesAndAmounts[1].amount += budgetData[i].expenseItems[j].amount
        else if (budgetData[i].expenseItems[j].category == 'Food')
          categoriesAndAmounts[2].amount += budgetData[i].expenseItems[j].amount
        else if (budgetData[i].expenseItems[j].category == 'Lunch')
          categoriesAndAmounts[3].amount += budgetData[i].expenseItems[j].amount
        else if (budgetData[i].expenseItems[j].category == 'Transport')
          categoriesAndAmounts[4].amount += budgetData[i].expenseItems[j].amount
      }
    }
    return categoriesAndAmounts
  }

  // this part should ask for user confirmation that user wants to delete current data
  const resetBudgetData = async() => {
    let resettedBudget = [
      {key: '1', day: 'Monday', expenseItems: []},
      {key: '2', day: 'Tuesday', expenseItems: []},
      {key: '3', day: 'Wednesday', expenseItems: []},
      {key: '4', day: 'Thursday', expenseItems: []},
      {key: '5', day: 'Friday', expenseItems: []},
      {key: '6', day: 'Saturday', expenseItems: []},
      {key: '7', day: 'Sunday', expenseItems: []},
    ]
    try {
      await AsyncStorage.setItem('NewDATA', JSON.stringify(resettedBudget))
    } catch (error) {
      console.log('ScreenSummary budget reset error:', error)
    }
  }

  const getSummaryByCategories = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <DataTable style={{padding: 15, width: '80%'}}>
          <DataTable.Header style={{padding: 15}}>
            <DataTable.Title>CATEGORY</DataTable.Title>
            <DataTable.Title>SPEND</DataTable.Title>
          </DataTable.Header>
          {
            budgetData
              ? getCategoriesAndSpends().map((item) => 
                  <DataTable.Row key={item.category}>
                    <DataTable.Cell>{item.category}</DataTable.Cell>
                    <DataTable.Cell>{item.amount.toFixed(2)}</DataTable.Cell>
                  </DataTable.Row>
                )
              : null
          }
        </DataTable>
      </View>
    )
  }

  return (
    <View>
      <View>
        <Text style={styles.top}>Budget Week Summary</Text>
      </View>
      <View style={{marginBottom: 10}}>
        <Button title='Update and show summary by days' color='green' onPress={() => {
          getDATA()
          setSummaryByDays(true)
          setSummaryByCategories(false)
        }}/>
      </View>
      <View style={{marginBottom: 10}}>
        <Button title='Update and show summary by categories' color='blue' onPress={() => {
          getDATA()
          setSummaryByDays(false)
          setSummaryByCategories(true)
        }}/>
      </View>
      {
        summaryByDays
          ? getSummaryByDays()
          : null
      }
      {
        summaryByCategories
          ? getSummaryByCategories()
          : null
      }
      <View>
        <Button title='Reset budget to zero' color='red' onPress={resetBudgetData} />
      </View>
    </View>
  )
}

export default ScreenSummary
