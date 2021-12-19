// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./Profile.sol";

contract Memes is Profile {
    uint256 likeCount = 0;
    uint256 id = 0;
    mapping(uint256 => MemePost) public memes;

    struct Comment {
        string commentDes;
        string commentor;
    }
    struct MemePost {
        string name;
        string hashUrl;
        string desc;
        uint256 likes;
        Comment[] comments;
    }
    string name;
    string token;

    function createMeme(string memory _hashUrl, string memory _desc) public {
        (name, token) = getAuth();
        require(bytes(token).length > 0, "You are not register");
        require(bytes(_hashUrl).length > 0);
        require(bytes(_desc).length > 0);

        MemePost storage meme = memes[id];

        meme.name = name;
        meme.hashUrl = _hashUrl;
        meme.desc = _desc;
        meme.likes = likeCount;

        id++;
    }

    function addLike(uint256 _id) public {
        (name, token) = getAuth();
        require(bytes(token).length > 0, "You are not register");

        MemePost storage meme = memes[_id];
        likeCount++;
        meme.likes = likeCount;
    }

    function addCommment(string memory _comment, uint256 _id) public {
        (name, token) = getAuth();
        require(bytes(token).length > 0, "You are not register");
        require(bytes(_comment).length > 0);

        MemePost storage meme = memes[_id];

        meme.comments.push(Comment({commentDes: _comment, commentor: name}));
    }
}
