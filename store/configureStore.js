import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
// import storage from 'redux-persist/lib/storage';

import photosReducer from '../components/photosSlice'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['photos']
}

const rootReducer = combineReducers({
    photos: persistReducer(persistConfig, photosReducer)
});


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export default store;