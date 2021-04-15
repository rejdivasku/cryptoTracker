import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';
import Autocomplete from 'react-native-autocomplete-input';

const Search = (props) => {
    const [hideResults, setHideResults] = useState(false);
    const [focused, setFocused] = useState(false);

    return(
        <View>
            <Autocomplete 
                data={props.suggestedCryptos}
                value={props.query}
                hideResults={hideResults}
                placeholder="Use a name or ticker symbol..."
                inputContainerStyle={[styles.input, focused ? styles.inputActive : styles.inputDefault]}
                onChangeText={(value) => {
                    props.onChangeHandler(value);
                    setHideResults(false);
                }}
                flatListProps={{
                    keyExtractor: (item) => item.id,
                    renderItem: ({item}) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.searchItem}
                            onPress={() => {
                                props.onSelectCrypto(item);
                                setHideResults(true);
                            }}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
                onFocus={() => {
                    setFocused(true)
                }}
                onBlur={() => {
                    setFocused(false)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginTop: 30,
    },
    inputDefault: {
        borderColor: '#b7c0c6',
    },
    inputActive: {
        borderColor: Colors.secondary,
    },
    searchItem: {
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    itemTitle: {
        color: Colors.dark,
        fontSize: 15
    }
});

export default Search;