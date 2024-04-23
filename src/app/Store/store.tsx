"use client";
import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import userSlice from '../Reducers/UserSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createuserSlice from '../Reducers/CreateUserSlice';
import deleteuserSlice from '../Reducers/DeleteUserSlice';
import editUserSlice from '../Reducers/editUserSlice';
import editentitySlice from '../Reducers/editEntitySlice';
import createentitySlice from '../Reducers/CreateEntitySlice';
const persistConfig = {
  key: 'root',
  storage,
}


const appReducer = combineReducers({
  user: userSlice,
  createusers: createuserSlice,
  deleteusers: deleteuserSlice,
  editusers: editUserSlice,
  editentity: editentitySlice,
  createentity: createentitySlice,
});

const rootReducer = (state:any, action:any) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
 });
 export type AppDispatch = typeof store.dispatch;
 export type RootState = ReturnType<typeof store.getState>;
 export const persistor = persistStore(store)