import React, { useState } from 'react';
import CryptoItem from './CryptoItem';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';
import { deleteCrypto, getCryptos, getUpdatedCryptos } from '../../store/actions/crypto';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

const CryptoList = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const dispatch = useDispatch();

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => onDeleteCrypto(data.item.id)}
            >
                <Ionicons name="ios-close-circle-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    const onDeleteCrypto = async (id) => {
        await dispatch(deleteCrypto(id));
    };

    const onRefreshHandler = async() => {
        setIsRefreshing(true);
        await dispatch(getCryptos(false));
        await dispatch(getUpdatedCryptos());
        setIsRefreshing(false);
    }

    return (
        <View>
            {props.cryptos && props.cryptos.length > 0 ? (
                <SwipeListView 
                    contentContainerStyle={styles.containerStyle}
                    onRefresh={onRefreshHandler}
                    refreshing={isRefreshing}
                    data={props.cryptos}
                    renderItem={(el) => {
                        return <View style={styles.rowFront}>  
                            <CryptoItem 
                                name={el.item.name}
                                symbol={el.item.symbol} 
                                price_usd={el.item.metrics.market_data.price_usd}
                                percent_change_usd_last_24_hours={el.item.metrics.market_data.percent_change_usd_last_24_hours}
                            />
                        </View>
                    }}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={0}
                    rightOpenValue={-60}
                />
            ) : <View style={styles.noItemContainer}>
                    <Text style={styles.noItemText}>No Crypto Currency added! Start adding some.</Text>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingBottom: 180,
        minHeight: '100%'
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0
    },
    backRightBtnRight: {
        backgroundColor: 'white',
        right: 30
    },
    noItemContainer: {
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItemText: {
        fontSize: 22,
        color: Colors.primary,
        textAlign: 'center',
        maxWidth: Dimensions.get('screen').width - 100
    }
});

export default CryptoList;