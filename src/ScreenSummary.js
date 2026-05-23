import React from 'react';
import { Text, View, Pressable, FlatList } from 'react-native';
import styles from './utils/styles';
import { DataTable } from 'react-native-paper'

function ScreenSummary({ navigation, route }) {
  const { dailyLimit, days } = route.params

  const countDailySpend = (expenseItems) => {
    let dailySum = 0
    for (let i=0; i<expenseItems.length; i++) {
      if (expenseItems[i].amount != undefined) {
        console.log('item:', expenseItems[i].amount)
        dailySum += expenseItems[i].amount
      }
    }
    return dailySum
  }

  const compareToBudget = (dayExpenses) => {
    if (dayExpenses > dailyLimit) return "OVER BUDGET!!!"
    return "OK"
  }

  return (
    <View>
      <View>
        <Text style={styles.top}>Budget Week Summary</Text>
      </View>
      <DataTable style={{padding: 15}}>
        <DataTable.Header style={{padding: 15}}>
          <DataTable.Title>DAY</DataTable.Title>
          <DataTable.Title>SPEND</DataTable.Title>
          <DataTable.Title>STATUS</DataTable.Title>
        </DataTable.Header>
        {
          days.map((item) => 
            <DataTable.Row key={item.key}>
              <DataTable.Cell>{item.day}</DataTable.Cell>
              <DataTable.Cell>{countDailySpend(item.expenseItems)}</DataTable.Cell>
              <DataTable.Cell>{compareToBudget(countDailySpend(item.expenseItems))}</DataTable.Cell>
            </DataTable.Row>
          )
        }
      </DataTable>
    </View>
  )
}

/*
        <FlatList 
          data={days} 
          renderItem={({item}) => (
            <View>
              <Text style={styles.summaryText}>{item.day} - {countDailySpend(item.expenseItems)}</Text>
            </View>
          )}
        />
*/

export default ScreenSummary
