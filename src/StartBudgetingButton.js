import React from "react"
import styles from "./utils/styles"
import { 
  Text, 
  View, 
  TouchableHighlight,
  Pressable,
} from 'react-native';

const StartBudgetingButton = (props) => {
    return (
        <View>
            <TouchableHighlight 
                style={styles.startbutton} 
                onPress={props.onPressFunction}
                activeOpacity={0.35}
                underlayColor='#8786ce'
            >
                <Text style={styles.text}>Start budgeting</Text>
            </TouchableHighlight>
            <Pressable
                onPress={props.onPressFunction}
                android_ripple={{color: '#00f'}}
                style={({ pressed }) => [
                    {backgroundColor: pressed ? '#dddddd' : '#4bd14b'},
                    styles.startbutton
                ]}
            >
                <Text>Start</Text>
            </Pressable>
        </View>
    )
}

export default StartBudgetingButton
