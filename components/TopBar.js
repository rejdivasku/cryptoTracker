import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const TopBar = () => {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>CryptoTracker Pro</Text>
            <Image source={{ uri: 'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png' }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 30
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    text: {
        color: 'white',
        fontSize: 25
    }
});

export default TopBar;