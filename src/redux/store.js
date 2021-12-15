import {configureStore} from '@reduxjs/toolkit';
import accountSlice from './web3.config/accountSlice';
import registerSlice from './registration/registrationSlice';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    register: registerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
