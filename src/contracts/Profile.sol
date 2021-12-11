// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Profile {
    uint32 personCount = 0;

    mapping(address => Person) public persons;

    struct Person {
        uint256 count;
        string name;
        string picture;
        mapping(uint256 => string) memes;
    }

    function createProfile(string memory hashUrl, string memory name) public {
        Person storage person = persons[msg.sender];

        person.count = personCount++;
        person.name = name;
        person.picture = hashUrl;
    }

    function updatePicture(string memory hashUrl) public {
        Person storage person = persons[msg.sender];

        person.picture = hashUrl;
    }

    function updateName(string memory name) public {
        Person storage person = persons[msg.sender];

        person.name = name;
    }
}
