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
import styles from './utils/styles.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ScreenWelcome from './ScreenWelcome';
import ScreenSetDailyBudget from './ScreenSetDailyBudget.js';
import ScreenToday from './ScreenToday.js';
import ScreenCalendar from './ScreenCalendar.js';
import ScreenSummary from './ScreenSummary';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const ScreenMain = ({ navigation, route }) => {
  const { dailyLimit } = route.params

  //const [ today, setToday ] = useState(2)

  const [ days, setDays ] = useState([
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

  const [ chosenBudgetingDay, setChosenBudgetingDay ] = useState("")
  const [ valittuPaiva, setValittuPaiva ] = useState("123")
  const weekdays = [
    {key: 1, value: 'Monday'},
    {key: 2, value: 'Tuesday'},
    {key: 3, value: 'Wednesday'},
    {key: 4, value: 'Thursday'},
    {key: 5, value: 'Friday'},
    {key: 6, value: 'Saturday'},
    {key: 7, value: 'Sunday'},
  ]
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color}) => {
          let iconName;
          /*if (route.name === 'ScreenSummary') {
            size = focused ? 25 : 20;
            color = focused ? '#f0f' : '#555';
          }*/
        },
        header: () => null
      })}
      tabBarOptions={{
        activeBackgroundColor: '#f0f',
        inactiveBackgroundColor: '#999',
      }}
      initialRouteName="ScreenCalendar"
    >
      <Tab.Screen 
        name='ScreenToday' 
        options={{ title: 'Today' }}
        component={ScreenToday}
        initialParams={{ dailyLimit: dailyLimit, days: days, valittuPaiva: valittuPaiva,
          chosenBudgetingDay: chosenBudgetingDay
         }}
      />
      <Tab.Screen 
        name='ScreenCalendar' 
        options={{ title: 'Calendar' }}
        component={ScreenCalendar}
        initialParams={{ dailyLimit: dailyLimit, days: days, weekdays: weekdays,
          setChosenBudgetingDay: setChosenBudgetingDay
        }}
      />
      <Tab.Screen 
        name='ScreenSummary' 
        options={{ title: 'Summary' }}
        component={ScreenSummary}
        initialParams={{ dailyLimit: dailyLimit, days: days }}
        //options={{ header: () => null }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  const [showWarningModal, setShowWarningModal] = useState(false)

  /*
    Screens in Stack:
      1) ScreenWelcome shows in the beginning for 3 seconds (and only once)
      2) ScreenSetDailyBudget shows after ScreenWelcome and only once
      3) ScreenMain contains Tab Navigation to screens Today, Calendar and Summary
  */
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ScreenWelcome" component={ScreenWelcome} />
        <Stack.Screen name="ScreenSetDailyBudget" component={ScreenSetDailyBudget} />
        <Stack.Screen name="ScreenMain" component={ScreenMain} />
      </Stack.Navigator>
    </NavigationContainer>
    /*
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
      </ImageBackground>
    //</View>
    */
  );
}

export default App;
