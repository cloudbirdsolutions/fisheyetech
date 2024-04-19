"use client";
import { Provider } from 'react-redux';
import { persistor, store } from '../Store/store';
import { PersistGate } from 'redux-persist/integration/react';

export function Providers({ children }: any) {
  return <Provider store={store}><PersistGate loading={null} persistor={persistor}>{children}</PersistGate></Provider>;
};