import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './utils/styles';
import { DataTable } from 'react-native-paper'
import countDailySpend from './functions';
import { useIsFocused } from '@react-navigation/native';

function ScreenSummary({ navigation, route }) {
  const { dailyLimit } = route.params
  const [ budgetData, setBudgetData ] = useState('')
  const [ summaryByDays, setSummaryByDays ] = useState(false)
  const [ summaryByCategories, setSummaryByCategories ] = useState(false)

  const compareToDailyBudget = (dayExpenses) => {
    console.log('compareToDailyBudget:', dayExpenses)
    console.log('dailyLimit          :', dailyLimit)
    if (dayExpenses > dailyLimit)
      return "OVER BUDGET!!!"
    return "OK"
  }

  useEffect(() => {
    getDATA()
  }, [])

  const getDATA = async () => {
    console.log('ScreenSummary getting DATA')
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

  const isFocused = useIsFocused();

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
                    <DataTable.Cell>{countDailySpend(item.expenseItems)}</DataTable.Cell>
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
    /*for (let k=0; k<3; k++) {
      console.log('--->', categoriesAndAmounts[k])
    }*/
    for (let i=0; i<7; i++) {
      //console.log('item:', budgetData[i])
      for (let j=0; j<budgetData[i].expenseItems.length; j++) {
        console.log('expense:', budgetData[i].expenseItems[j].category)
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
    console.log('IN THE END:', categoriesAndAmounts)
    return categoriesAndAmounts
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
                    <DataTable.Cell>{item.amount}</DataTable.Cell>
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
      <Text>{isFocused ? 'focused' : 'unfocused'}</Text>
    </View>
  )
}

export default ScreenSummary

/*
      <View style={{marginBottom: 10}}>
        <Button title='Update Summary' color='green' onPress={getDATA} />
      </View>
*/