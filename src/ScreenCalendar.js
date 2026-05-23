import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './utils/styles';
import { Button } from 'react-native-web';

function ScreenCalendar({ navigation, route }) {
  const { dailyLimit, days, weekdays, setChosenBudgetingDay } = route.params;
  const [ valittuPaiva, setValittuPaiva ] = useState("")
  const [ selected, setSelected ] = useState("");

  function asetaPaiva(arvo) {
    setValittuPaiva(arvo)
    setChosenBudgetingDay(arvo)
    console.log("eka :", valittuPaiva)
  }

  return (
    <View>
        <View>
        <Text style={styles.top}>Calendar</Text>
        </View>
        <Text style={styles.text}>Your daily budget is {dailyLimit} euros</Text>
        <Text>Choose day</Text>
        <SelectList 
            setSelected={(val) => setSelected(val)} 
            data={weekdays} 
            save="value"
            onSelect={() => {
                asetaPaiva(selected)
                //alert(selected)
            }}
        />
        <Text>You chose {valittuPaiva}</Text>
        <Button title='confirm' onPress={() => asetaPaiva(selected)} />
    </View>
  )
}

export default ScreenCalendar
