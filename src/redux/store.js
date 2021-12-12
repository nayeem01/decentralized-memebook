import {configureStore} from '@reduxjs/toolkit';
import accountSlice from './web3.config/accountSlice';
export const store = configureStore({
  reducer: {
    account: accountSlice,
  },
});
