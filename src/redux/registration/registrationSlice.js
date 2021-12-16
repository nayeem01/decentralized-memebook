import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import jwt from 'jsonwebtoken';
import {secret} from './jwt-secret.json';

import {profileContract, getAccounts} from '../web3.config/load.web3';

export const signUp = createAsyncThunk('', async (userInfo) => {
  const profile = await profileContract();
  const acc = await getAccounts();
  const token = await jwt.sign(userInfo, secret);

  const person = await profile.methods
    .createProfile(token, userInfo.name)
    .send({from: acc[0]});

  return person.events.ProfileCreate;
});

export const logIn = createAsyncThunk('login', async ({password}) => {
  const profile = await profileContract();
  const user = await profile.methods.getAuth().call();

  if (user?.token) {
    const decoded = jwt.verify(user?.token, secret);

    if (password.toString() === decoded.password.toString()) {
      window.localStorage.setItem('token', user?.token);

      return true;
    }
  }
  return false;
});

const initialState = {
  state: '',
  name: '',
  recept: {},
  isLogin: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.recept = action.payload;
        state.status = 'idle';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLogin = action.payload;
      });
  },
});

export const {increment, decrement, incrementByAmount} = registerSlice.actions;

export default registerSlice.reducer;
