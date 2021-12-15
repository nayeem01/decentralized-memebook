// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./Profile.sol";

contract Memes is Profile {
    uint256 likeCount = 0;
    uint256 id = 0;
    mapping(uint256 => MemePost) memes;

    struct Comment {
        string commentDes;
        address commentor;
    }
    struct MemePost {
        address owner;
        string hashUrl;
        string desc;
        uint256 likes;
        Comment[] comments;
    }

    function createMeme(string memory _hashUrl, string memory _desc) public {
        MemePost storage meme = memes[id];

        meme.owner = msg.sender;
        meme.hashUrl = _hashUrl;
        meme.desc = _desc;
        meme.likes = likeCount;

        id++;
    }

    function addLike(uint256 _id) public {
        MemePost storage meme = memes[_id];
        likeCount++;
        meme.likes = likeCount;
    }

    function addCommment(string memory _comment, uint256 _id) public {
        MemePost storage meme = memes[_id];

        meme.comments.push(
            Comment({commentDes: _comment, commentor: msg.sender})
        );
    }
}
