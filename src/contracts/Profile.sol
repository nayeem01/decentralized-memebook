// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Profile {
    uint32 public personCount = 0;

    mapping(address => Person) public persons;

    event ProfileCreate(string name, string token);
    event profilePicture(string url);
    event nameUpdate(string name);

    struct Person {
        uint256 count;
        string name;
        string picture;
        string token;
    }

    function createProfile(string memory _token, string memory _name) public {
        require(bytes(_token).length > 0);
        require(bytes(_name).length > 0);

        Person storage person = persons[msg.sender];
        personCount += 1;
        person.count = personCount;
        person.name = _name;
        person.token = _token;

        emit ProfileCreate(person.name, person.token);
    }

    function updatePicture(string memory hashUrl) public {
        require(bytes(hashUrl).length > 0, "invalid Url");

        Person storage person = persons[msg.sender];

        person.picture = hashUrl;

        emit profilePicture(person.picture);
    }

    function updateName(string memory _name) public {
        require(bytes(_name).length > 0, "invalid name");

        Person storage person = persons[msg.sender];

        person.name = _name;
        emit nameUpdate(person.name);
    }

    function getAuth() public view returns (Person memory) {
        Person storage person = persons[msg.sender];

        require(bytes(person.name).length > 0);
        require(bytes(person.token).length > 0);

        return persons[msg.sender];
    }
}
