import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Feather } from '@expo/vector-icons';

const CryptoItem = (props) => {
    const { symbol, name, price_usd, percent_change_usd_last_24_hours } = props;

    return (
        <View style={styles.containerMain}>
            <View style={styles.container}>
                <Text style={styles.nameStyle}>{name}</Text>
                <Text style={styles.symbolStyle}>{symbol}</Text>
            </View>
            
            <View style={[styles.container, styles.rightContainer]}>
                <Text style={styles.nameStyle}>${price_usd.toFixed(2)}</Text>
                <Text 
                    style={{ color: percent_change_usd_last_24_hours < 0 ? 'red' : 'green' }}
                >
                    <Feather size={16} name={percent_change_usd_last_24_hours < 0 ? 'arrow-down-left' : 'arrow-up-right'} />
                    {percent_change_usd_last_24_hours.toFixed(2)}%
                </Text>
            </View>
        </View>
    )
   
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: '50%'
    },
    rightContainer: {
        alignItems: 'flex-end'
    },
    containerMain:{
        flexDirection: 'row',
        marginHorizontal: 30,
        paddingVertical: 25,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        elevation: 1
    },
    nameStyle: {
        fontSize: 20,
        color: Colors.dark,
    },
    symbolStyle: {
        color: Colors.primary
    }
  })

export default CryptoItem;