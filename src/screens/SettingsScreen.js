import React, { useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { View, Text, StyleSheet, SafeAreaView, Alert}  from 'react-native';

const SettingsScreen = () => {
    const db = SQLite.openDatabase({ name: 'news.db', createFromLocation: '~www/news.db'}, null, error => handleError(error));
    const [ title, setTitle] = useState("");
    const [ post, setPost] = useState("");

    const handleSendData = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO Posts (Title, post) values (?, ?)', [title, post],
                (txObj, resultSet) => resultSet.rowsAffected > 0 && Alert.alert("Successfully inserted"),
                (txObj, error) => console.log('Error', error))
        })
    }

    console.log({title, post})
    return(
        <SafeAreaView style={styles.container}>
            <Input
                label="Title"
                value={title}
                onChangeText={val => setTitle(val)}
                rightIcon={{ type: 'font-awesome', name: 'edit' }}
                style={styles.input} />
            <Input 
                label="Post"
                onChangeText={val => setPost(val)}
                style={styles.input}
                rightIcon={{ type: 'font-awesome', name: 'edit' }}/>
            <Button title="Save" onPress={()=> handleSendData()}/>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})
export { SettingsScreen };