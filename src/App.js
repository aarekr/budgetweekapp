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
  TouchableHighlight,
  Pressable,
  Modal,
} from 'react-native';
import { ImageBackground } from 'react-native-web';
import StartBudgetingButton from './StartBudgetingButton';
import styles from './styles';

const App = () => {
  const [dailyLimit, setDailyLimit] = useState(0)
  const [showWarningModal, setShowWarningModal] = useState(false)

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
    if (dailyLimit <= 0) {
      setShowWarningModal(true)
      //setTimeout(() => setShowWarningModal(false), 2000)
    }
    console.log('Starting budgting, dailyLimit: ', dailyLimit)
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
      console.log("Daily limit set to: ", value)
    }
  }

  // returns sum of expenses for a day
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
    //<View style={styles.container}>
      <ImageBackground 
        style={styles.image} 
        source={require('../assets/backgroundpalmbeach.jpg')}
        resizeMode='center'
      >
        <View>
          <Text style={styles.top}>Budget Week</Text>
        </View>
        <Modal 
          visible={showWarningModal} 
          transparent
          animationType='fade'
          hardwareAccelerated
          onRequestClose={() => setShowWarningModal(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.warningModal}>
              <View style={styles.warningTitle}>
                <Text style={styles.text}>Warning!</Text>
              </View>
              <View style={styles.warningBody}>
                <Text style={styles.text}>Daily budget must be more than 0</Text>
              </View>
              <Pressable 
                style={styles.warningMobalButton}
                onPress={() => setShowWarningModal(false)}
                android_ripple={{color:'#fff'}}
              >
                <Text style={styles.text}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
          <StartBudgetingButton onPressFunction={startBudgeting} />
          <FlatList 
            data={days} 
            renderItem={({item}) => (
              <View>
                <Text style={styles.summaryText}>{item.day} - {countDailySpend(item.expenseItems)}</Text>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    //</View>
  );
}

export default App;
