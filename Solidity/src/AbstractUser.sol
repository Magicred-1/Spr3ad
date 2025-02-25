// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

abstract contract AbstractUser {
    mapping(address => string[]) public userToTags;
    address[] users;
    mapping(address => int32) userToReputation;
    
    event UserCreated(address user, string[] tags);

    function setupUser(string[] memory tags) external {
        address user = msg.sender;
        userToTags[user] = tags;
        users.push(user);
        emit UserCreated(user, tags);
    }

    function userReach(address user) view public returns(uint32 reach){
        reach = 8;
    }

    function updateReputation(bool up, address user) internal {
        if (up){
            userToReputation[user] += 1;
            return;
        }
        userToReputation[user] -= 1;
    }
}
