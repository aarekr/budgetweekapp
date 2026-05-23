import React, {useState} from 'react';
import { Text, TextInput, View, Pressable, } from 'react-native';
import styles from './utils/styles';

// this screen is used for setting the daily budget amount/limit
function ScreenSetDailyBudget({ navigation, route }) {
  const [ dailyLimit, setDailyLimit ] = useState(0)

  // checking that daily spend limit is a valid number
  const checkDailyLimit = (value) => {
    if (value < 0) {
      console.log("Can't set negative limits!")
      return
    } else if (value.includes('-')) {
      return
    } else if (value > 0) {
      setDailyLimit(value)
      console.log("Daily limit set to: ", value)
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
          onChangeText={(value) => checkDailyLimit(value)}
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
