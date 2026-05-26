import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './utils/styles';
import { DataTable } from 'react-native-paper'
import countDailySpend from './functions';
//import { useIsFocused } from '@react-navigation/native';

function ScreenSummary({ navigation, route }) {
  const { dailyLimit } = route.params
  const [ budgetData, setBudgetData ] = useState('')

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

  return (
    <View>
      <View>
        <Text style={styles.top}>Budget Week Summary</Text>
      </View>
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
      <View style={{marginBottom: 10}}>
        <Button title='Update Summary' color='green' onPress={getDATA} />
      </View>
    </View>
  )
}

export default ScreenSummary
