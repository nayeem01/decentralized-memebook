// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Profile {
    uint32 personCount = 0;

    mapping(address => Person) public persons;
    event ProfileCreate(string name, string token);

    struct Person {
        uint256 count;
        string name;
        string picture;
        string token;
    }

    function createProfile(string memory _token, string memory name) public {
        Person storage person = persons[msg.sender];

        person.count = personCount++;
        person.name = name;
        person.token = _token;

        emit ProfileCreate(person.name, person.token);
    }

    function updatePicture(string memory hashUrl) public {
        Person storage person = persons[msg.sender];

        person.picture = hashUrl;
    }

    function updateName(string memory name) public {
        Person storage person = persons[msg.sender];

        person.name = name;
    }

    function getAuth() public view returns (Person memory) {
        return persons[msg.sender];
    }
}
