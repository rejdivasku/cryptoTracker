import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-native";
import CryptoList from '../components/CryptosList/CryptosList';
import FloatingButton from '../components/FloatingButton';
import Colors from '../constants/Colors';

const Home = () => {
    const history = useHistory();

    const cryptos = useSelector(state => state.crypto.cryptos);
    const isLoading = useSelector(state => state.crypto.isLoading);

    return(
        <View style={styles.screen}>
            <TopBar />
           
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            ) : (
                <View style={styles.body}>
                    <CryptoList cryptos={cryptos} />
                    <FloatingButton history={history} /> 
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    body: {
        height: "100%",
        justifyContent: "space-between"
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Home;