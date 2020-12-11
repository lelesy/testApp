import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Item } from '../components';
import SQLite from 'react-native-sqlite-storage';

const DATA = [
  {
    id: '1',
    title: 'First Item'
  },
  {
    id: '2',
    title: 'Second Item'
  },
  {
    id: '3',
    title: 'Third Item'
  },
]

const HomeScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [ data, setData] = useState([]);
  const db = SQLite.openDatabase({ name: 'news.db', createFromLocation: '~www/news.db'}, null, error => handleError(error));
  
  useEffect(()=>{ handleGetData().then(res=>setData(res)) }, [])
  
  const handleGetData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Posts', [], (tx, results) => {
          let posts = [];
          const rowLength = results.rows.length;
          if (rowLength > 0) {
            for (let i = 0; i < rowLength; i++) {
              posts.push({...results.rows.item(i)});
            }
          };
          resolve(posts);
        });
      });
    });
  }

  const handleError = (error) => {
    console.log(error);
  }

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'gray' : 'skyblue';
    return(
      <Item item={item} backgroundColor={backgroundColor}  handleOnPress = {()=> handleOpenDetails(item.id)} />
    )
  }

  const handleOpenDetails = (id) => {
    const selectedItem = data.filter(item => item.id === id);
    console.log({selectedItem})
    navigation.navigate('Details', { details: selectedItem[0].post })
  }  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export { HomeScreen };
