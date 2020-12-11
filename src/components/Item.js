import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Item = ({item, backgroundColor, handleOnPress}) => {
    return(
        <TouchableOpacity style={[styles.item,  { backgroundColor }] } onPress={handleOnPress}>
          <Text style={styles.title}>{item.Title}</Text> 
          
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