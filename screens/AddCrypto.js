import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { useHistory } from 'react-router-native'; 
import Search from '../components/Search';
import ButtonAddCurrency from '../components/ButtonAddCurrency';
import Colors from '../constants/Colors';
import DefaultButton from '../components/DefaultButton';
import CustomStatusBar from '../CustomStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestionsCryptos, addCrypto } from '../store/actions/crypto';

function findCrypto(query, cryptos) {
    if (query === '') {
        return [];
    }

    const regex = new RegExp(`${query.trim()}`, 'i');
    return cryptos.filter((crypto) => crypto.name.search(regex) >= 0 || crypto.symbol.search(regex) >= 0);
}

const AddCrypto = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [query, setQuery] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        getSuggestionsCryptosList();
    }, []);

    const getSuggestionsCryptosList = async () => {
        await dispatch(getSuggestionsCryptos());
    }

    const onChangeHandler = (value) => {
        setQuery(value);
    }

    const onSelectCrypto = (item) => {
        setQuery(item.name);
        setSelectedItem(item);
    };

    const onAddHandler = async () => {
        if(query !== '' && selectedItem !== null) {
            await dispatch(addCrypto(selectedItem));
            history.goBack();
        } else {
            Alert.alert('Select a currency!');
        }
    };

    const suggestedCryptos = useSelector(state => state.crypto.suggestedCryptos);
    const filteredCryptos = findCrypto(query, suggestedCryptos);

    return(
        <View style={styles.screen}>
            <CustomStatusBar barStyle="dark-content" />

            <View style={styles.backBtn}>
                <DefaultButton title="< Back to list" path="/" onPress={() => {
                    history.goBack();
                }} />
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                    <Text style={styles.headerText}>
                        Add a Cryptocurrency
                    </Text>
                    <Search 
                        query={query} 
                        suggestedCryptos={filteredCryptos} 
                        onChangeHandler={onChangeHandler}
                        onSelectCrypto={onSelectCrypto}
                    />
                    <ButtonAddCurrency 
                        onAddHandler={onAddHandler} 
                        selectedItem={selectedItem}
                    />
                </View>
        </ScrollView>
       </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 30,
        paddingBottom: 40
    },
    backBtn: {
        alignItems: 'flex-start'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    },
    headerText: {
        fontSize: 30,
        color: Colors.dark,
        fontWeight: "bold",
    }
  });

export default AddCrypto;