import React, { useState } from 'react';

import {StyleSheet, SafeAreaView, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Item } from './src/components';

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

const App: () => React$Node = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    console.log({item})
    console.log({selectedId})

    let backgroundColor = '';
    if(item.id === selectedId){
      backgroundColor = 'gray'
    }else{
      backgroundColor = '#fdb827'
    }
    //const backgroundColor = item.id === selectedId ? 'gray' : 'skyblue';
    return(
      <Item item={item} backgroundColor={backgroundColor}  handleOnPress = {()=> setSelectedId(item.id)}/>
    )
  }



  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
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

export default App;
