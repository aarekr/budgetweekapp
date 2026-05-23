import React from 'react';
import { Text, View, Pressable, } from 'react-native';

// this screen is shown for 2 seconds when the app starts
function ScreenWelcome({ navigation }) {
  setTimeout(() => goToScreenSetDailyBudget(), 2000)

  const goToScreenSetDailyBudget = () => {
    //navigation.replace('ScreenSetDailyBudget')  // navigation.navigate when creating a stack
    navigation.navigate('ScreenSetDailyBudget')
  }

  return (
    <View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
      <Text style={{fontSize: 40, textAlign: 'center'}}>Welcome</Text>
    </View>
  )
}

export default ScreenWelcome
