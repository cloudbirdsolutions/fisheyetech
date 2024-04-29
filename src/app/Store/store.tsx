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
import createjobSlice from '../Reducers/CreateJobSlice';
import createdepartmentSlice from '../Reducers/CreateDepartmentSlice';
import deletedepartmentSlice from '../Reducers/DeleteDepartmentSlice';
import editdepartmentSlice from '../Reducers/editDepartmentSlice';
import deleteEntitySlice from '../Reducers/DeleteEntitySlice';
import createroleSlice from '../Reducers/CreateRoleSlice';
import deleteroleSlice from '../Reducers/DeleteRoleSlice';
import editroleSlice from '../Reducers/editRoleSlice';
import deletedocumentSlice from '../Reducers/DeleteDocumetSlice';
import createdocumentSlice from '../Reducers/CreateDocumentSlice';
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
  createdocuments: createdocumentSlice,
  createjobs: createjobSlice,
  createdepartments: createdepartmentSlice,
  deletedepartments: deletedepartmentSlice,
  editdepartments: editdepartmentSlice,
  deleteentity: deleteEntitySlice,
  createroles: createroleSlice,
  deleteroles: deleteroleSlice,
  editroles: editroleSlice,
  deletedocuments: deletedocumentSlice,
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