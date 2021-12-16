const {assert} = require('chai');
const Profile = artifacts.require('Profile');

require('chai').use(require('chai-as-promised')).should();

contract('Profile', ([author]) => {
  let profile;

  before(async () => {
    profile = await Profile.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await profile.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('count user in memeBoook', async () => {
      const count = await profile.personCount();
      assert.equal(count, 0);
    });
  });

  describe(' account', async () => {
    let person, token, userName, hashurl, count;

    before('create profile', async () => {
      token = 'jdljfdlsfjsdlfkjdlkjfldsjfldskflds';
      userName = 'test';
      person = await profile.createProfile(token, userName, {from: author});

      count = await profile.personCount();
    });

    it('created user profile', async () => {
      assert.equal(count, 1);
      const result = person.logs[0].args;

      assert.equal(result.name, userName);
      assert.equal(result.token, token);

      await profile.createProfile('', userName, {from: author}).should.be
        .rejected;

      await profile.createProfile(token, '', {from: author}).should.be.rejected;
    });

    it('update profile picture', async () => {
      hashurl = 'skdaskdlsakdsadksd';

      await profile.updatePicture('', {from: author}).should.be.rejected;

      const pic = await profile.updatePicture(hashurl, {from: author});

      const result = pic.logs[0].args;
      assert.equal(result.url, hashurl);
    });

    it('login', async () => {
      const login = await profile.getAuth({from: author});

      assert.equal(login.name, userName);
      assert.equal(login.token, token);
      assert.equal(login.picture, hashurl);
    });

    it('update user name', async () => {
      userName = 'updated test';
      await profile.updateName('', {from: author}).should.be.rejected;
      const person = await profile.updateName(userName, {from: author});

      const result = person.logs[0].args;

      assert.equal(result.name, userName);
    });
  });
});
