import React from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from './utils/styles';

function ScreenToday({ navigation, route }) {
  const { dailyLimit, days, valittuPaiva, chosenBudgetingDay } = route.params

  return (
    <View>
      <Text>Today is {valittuPaiva}</Text>
      <Text>Today is {chosenBudgetingDay}</Text>
    </View>
  )
}

export default ScreenToday
