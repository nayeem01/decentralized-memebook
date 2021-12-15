import Profile from '../../abis/Profile.json';
import Web3 from 'web3';

export const loadweb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({method: 'eth_requestAccounts'});
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert('install metaMask');
  }
};

export const getAccounts = async () => await window.web3.eth.getAccounts();

export const profileContract = async () => {
  loadweb3();
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();
  const networkData = Profile.networks[networkId];
  if (networkData) {
    const profile = new web3.eth.Contract(Profile.abi, networkData.address);
    return profile;
  }
  return;
};
