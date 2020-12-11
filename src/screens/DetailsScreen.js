import React, { useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { Button} from 'react-native-elements';
import { View, Text, TextInput, Alert}  from 'react-native';

const DetailsScreen = ({route, navigation}) => {
    const db = SQLite.openDatabase({ name: 'news.db', createFromLocation: '~www/news.db'}, null, error => handleError(error));
    const { details, id, data, handleData } = route.params;

    const [ post, setPost] = useState(details);

    const handleUpdateDetails = (id) => {
        const arr = [...data]; //spread
        db.transaction(tx => {
            tx.executeSql('UPDATE Posts SET post=? WHERE id = ?', [post, id],
                (txObj, resultSet) =>  {
                    if(resultSet.rowsAffected > 0 ){
                        arr.map(item => {
                            if (item.id === id){
                                item.post = post;
                                arr.push(oldArray => [...oldArray, item]);
                                handleData(arr);
                            }
                            else
                                return item
                        })
                        Alert.alert("Successfully updated");
                        setTimeout(() => { navigation.goBack()}, 2000);
                    }
                },
                (txObj, error) => console.log('Error', error))
        })
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <TextInput 
                label="Post"
                value={post}
                onChangeText={val => setPost(val)}
                multiline
                numberOfLines={10}
                rightIcon={{ type: 'font-awesome', name: 'edit' }}/>
            <Button title="Save" onPress={()=> handleUpdateDetails(id)}/>
        </View>
    )
}

export { DetailsScreen };