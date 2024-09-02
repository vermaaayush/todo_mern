import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import todoReducer from '../slice/todoSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // Import sessionStorage

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: storageSession, // Use sessionStorage instead of localStorage
  whitelist: ['user'], // Only persist the user slice
};

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
});

// Create a persisted reducer using the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
