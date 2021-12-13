import {createSlice} from '@reduxjs/toolkit';
import Profile from '../../abis/Profile.json';
import Memes from '../../abis/Memes.json';
import Web3 from 'web3';

var web3;

const loadWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (web3) {
    web3 = new Web3(web3.currentProvider);
  } else {
    window.alert('install metaMask');
  }
};

const loadprofile = async () => {
  loadWeb3();

  const accounts = await web3.eth.getAccounts();

  const networkId = await web3.eth.net.getId();
  const networkData = Profile.networks[networkId];
  if (networkData) {
    const profile = new web3.eth.Contract(Profile.abi, networkData.address);
    //const imagesCount = await decentragram.methods.imageCount().call();
    const persons = await profile.methods.persons(accounts[0]).call();
    console.log(persons);
  }
  return accounts[0];
};

const initialState = {
  account: () => loadprofile(),
};

export const accountSlice = createSlice({
  name: 'counter',
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
});

export const {increment, decrement, incrementByAmount} = accountSlice.actions;

export default accountSlice.reducer;
