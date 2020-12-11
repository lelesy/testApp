import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import SQLite from 'react-native-sqlite-storage';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Item = ({item, backgroundColor, handleOnPress, data, handleData}) => {
  const db = SQLite.openDatabase({ name: 'news.db', createFromLocation: '~www/news.db'}, null, error => handleError(error));

  const handleRemove = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Posts WHERE id = ? ', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let newList = data.filter(data => {
              if (data.id === id)
                return false
              else
                return true
            })
            console.log({newList})
            handleData(newList)
          }
        })
    })
  }
  return(
      <TouchableOpacity style={[styles.item,  { backgroundColor }] } onPress={handleOnPress}>
        <Text style={styles.title}>{item.Title}</Text> 
        <Icon.Button name="delete" backgroundColor="skyblue" onPress={() => handleRemove(item.id)}>Удалить</Icon.Button>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24
  }
});


export { Item };