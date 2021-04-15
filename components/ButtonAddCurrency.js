import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const ButtonAddCurrency = (props) =>{
    return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={props.onAddHandler}
                style={styles.button}
            >
                <Text style={[styles.buttonText, props.selectedItem !== null ? styles.activeButton : styles.defaultButton]}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'flex-end',
        zIndex: -1,
        marginTop: 20
    },
    button: {
        borderRadius: 5,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        paddingVertical: 15,
        width: '45%'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    activeButton: {
        color: Colors.primary
    },
    defaultButton: {
        color: '#d4b955'
    }
  });

export default ButtonAddCurrency;