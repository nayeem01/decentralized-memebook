const Memes = artifacts.require('Memes');
const Profile = artifacts.require('Profile');

module.exports = function (deployer) {
  deployer.deploy(Memes);
  deployer.deploy(Profile);
};
