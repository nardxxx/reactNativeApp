import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Favorites from './screens/Favorites';
import Photos from './screens/Photos';

import store, { persistor } from './store/configureStore'


const Tab = createBottomTabNavigator();


const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Photos':
      iconName = 'view-dashboard';
      break;
    case 'Favorites':
      iconName = 'bookmark-multiple-outline';
      break;
    default:
      break;
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: 'orange',
              tabBarInactiveTintColor: '#2D3038',
              headerShown: false,
              tabBarIcon: ({ color }) => screenOptions(route, color)
            })}
            initialRouteName="Photos"
          >
            <Tab.Screen name="Photos" component={Photos} />
            <Tab.Screen name="Favorites" component={Favorites} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider >
  );
}

export default App
