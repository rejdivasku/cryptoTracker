import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const FloatingButton = (props) =>{
    return(
        <TouchableOpacity 
            activeOpacity={0.7}
            style={styles.button} onPress={() => {
                props.history.push('/add');
            }}
        >
            <Ionicons
                size={30}
                name="ios-add"
                color="white"
            />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 30,
        bottom: 200,
        elevation: 8
    }
});

export default FloatingButton;