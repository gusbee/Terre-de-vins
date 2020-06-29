import { createStore } from 'redux'
import { persistCombineReducers } from 'redux-persist'
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem'

// Reducers
import favoritesReducer from './reducers/favoritesReducer'
import contentReducer from './reducers/contentReducer'

const persistConfig = {
    key: "tdv",
    storage: ExpoFileSystemStorage
}

export default createStore(persistCombineReducers(persistConfig, {contentReducer, favoritesReducer}));