import React from 'react';
import { StyleSheet, Button, View, Platform } from 'react-native';
import Colors from '../constants/Colors';

const CustomButton = (props) =>{
    return(
        <View style={styles.buttonContainer}>
            <Button
                onPress={props.onPress}
                title={props.title}
                style={styles.title}
                color={Colors.primary}
            />
        </View>
        
    )
}
const styles = StyleSheet.create({
  buttonContainer: {
      marginTop: Platform.OS === 'android' ? 70 : 20
    }
  });

export default CustomButton;