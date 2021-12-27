import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import makeApolloClient from './apollo';
import HomeScreen from './App/Containers/HomeScreen/HomeScreen';
import DetailsScreen from './App/Containers/DetailsScreen/DetailsScreen';

import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    const client = makeApolloClient();

    setClient(client);
  }, [])

  if (!client) {
    return <ActivityIndicator size='large' color='#000' />
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Space Xplorer' }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App