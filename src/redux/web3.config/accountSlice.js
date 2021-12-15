import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Profile from '../../abis/Profile.json';
import Memes from '../../abis/Memes.json';
import {loadweb3} from './load.web3.js';

export const loadprofile = createAsyncThunk('Loadprofile', async () => {
  loadweb3();
  const web3 = window.web3;
  const account = await web3.eth.getAccounts();
  return account[0];
  // const networkId = await web3.eth.net.getId();
  // const networkData = Profile.networks[networkId];
  // if (networkData) {
  //   const profile = new web3.eth.Contract(Profile.abi, networkData.address);
  //   const persons = await profile.methods.persons(accounts[0]).call();
  //   console.log(persons.name);
  //   console.log(profile);
  //   return persons;
  // }
});

const initialState = {
  status: '',
  account_Address: '',
  person: {},
};

export const accountSlice = createSlice({
  name: 'account',
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
      .addCase(loadprofile.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loadprofile.fulfilled, (state, action) => {
        state.account_Address = action.payload;
        state.status = 'idle';
      });
  },
});

export const {increment, decrement, incrementByAmount} = accountSlice.actions;

export default accountSlice.reducer;
