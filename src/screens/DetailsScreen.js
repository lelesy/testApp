import React from 'react';
import { View, Text }  from 'react-native';

const DetailsScreen = ({route}) => {
    const { details } = route.params;
    return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text style={{ textAlign: 'center'}}>{details}</Text>
        </View>
    )
}

export { DetailsScreen };