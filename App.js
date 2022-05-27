import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import Favorites from './screens/Favorites';
import Photos from './screens/Photos';

import store, { persistor } from './store/configureStore'

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Photos"
          >
            <Tab.Screen name="Photos" component={Photos} />
            <Tab.Screen name="Favorites" component={Favorites} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App
