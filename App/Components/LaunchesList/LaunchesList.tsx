import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { useQuery, gql } from '@apollo/client';

import { GET_LAUNCHES_PAST } from '../../GraphQL/Queries/Launches'
import Launch from '../Launch/Launch'
import Styles from './LaunchesList.style'

const LaunchesList = ({ launches, navigation }) => {
  const onPress = (data) => {
    navigation.navigate('Details', { data })
  }

  return (
    <FlatList
      data={launches}
      style={Styles.list}
      renderItem={({ item }) => <Launch page={false} data={item} onPress={() => onPress(item)} />}
    />
  )
}

 const LaunchesListQuery = ({ navigation }) => {
   const { loading, error, data } = useQuery(gql`${GET_LAUNCHES_PAST}`);
 
   if (loading) {
     return <ActivityIndicator size='large' color='#000' />;
   }
   if (error) {
     console.error(error);
     return <Text>Error!</Text>;
   }

   return <LaunchesList launches={data.launchesPast} navigation={navigation} />;
 };

export default LaunchesListQuery;