import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  ScrollView, 
  RefreshControl, 
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from 'react-native';

const App = () => {
  const [dailyLimit, setDailyLimit] = useState(0)

  const [days, setDays] = useState([
    {key: '1', day: 'Mon', expenseItems: [
                                          {category: 'lunch', amount: 11.90},
                                          {category: 'groceries', amount: 12.33}
                                        ]},
    {key: '2', day: 'Tue', expenseItems: [{category: 'lunch', amount: 9.19}]},
    {key: '3', day: 'Wed', expenseItems: [{category: 'lunch', amount: 11.90}]},
    {key: '4', day: 'Thu', expenseItems: []},
    {key: '5', day: 'Fri', expenseItems: []},
    {key: '6', day: 'Sat', expenseItems: []},
    {key: '7', day: 'Sun', expenseItems: []},
  ])

  // sets the daily spending budget and starts the app
  const startBudgeting = () => {
    console.log('Starting budgting')
    // navigate to calendar
  }

  // checking that daily spend limit is a valid number
  const checkDailyLimit = (value) => {
    if (value < 0) {
      console.log("Can't set negative limits!")
      return
    } else if (value == '-') {
      return
    } else {
      setDailyLimit(value)
    }
  }

  // returns expenses for a day
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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.top}>Budget Week</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodytext}>Welcome</Text>
        <Text style={styles.bodytext}>Set your dailt budget limit</Text>
        <Text style={styles.bodytext}>Limit: {dailyLimit}</Text>
        <TextInput 
          style={styles.textinput} 
          placeholder='amount' 
          onChangeText={(value) => checkDailyLimit(value)}
          keyboardType='numeric'
        />
        <TouchableHighlight 
          style={styles.startbutton} 
          onPress={startBudgeting}
          activeOpacity={0.35}
          underlayColor='#8786ce'
        >
          <Text style={styles.text}>Start budgeting</Text>
        </TouchableHighlight>
        <Pressable
          onPress={startBudgeting}
          android_ripple={{color: '#00f'}}
          style={({ pressed }) => [
            {backgroundColor: pressed ? '#dddddd' : '#4bd14b'},
            styles.startbutton
          ]}
        >
          <Text>Start</Text>
        </Pressable>
        <FlatList 
          data={days} 
          renderItem={({item}) => (
            <View>
              <Text style={styles.text}>{item.day} - {countDailySpend(item.expenseItems)}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
  },
  top: {
    //flex: 1,
    width: '100%',
    backgroundColor: '#9ea7d6',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodytext: {
    margin: 10,
  },
  textinput: {
    width: 70,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
  },
  startbutton: {
    width: 120,
    height: 30,
    backgroundColor: '#4bd14b',
    alignItems: 'center',
    //justifyContent: 'center',
    //marginBottom: 20,
    margin: 10,
  },
});

export default App;
