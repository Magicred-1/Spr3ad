// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {AbstractInboxes} from "./AbstractInboxes.sol";
import {AbstractGeneralizedInboxes} from "./AbstractGeneralizedInboxes.sol";
import {AbstractUser} from "./AbstractUser.sol";
import {IActions} from "./IActions.sol";
import {CardRegistry} from "./CardRegistry.sol";

struct CardSpread {
    address user;
    bytes32 cardId;
}

// TODO: only owner
//TODO: make this as a 
contract App is IActions, CardRegistry, AbstractInboxes, AbstractGeneralizedInboxes, AbstractUser{
    //TODO: create a mapping from request Id to struct {Address user, bytes32 cardId} 
    mapping(uint256 => CardSpread) requestIdToData;
    //TODO: add the chainlink VRF address
    constructor(address tagNfswSetter) CardRegistry(tagNfswSetter){
    }

    function postCard(bytes32 hash, uint8 hash_function) external returns (bytes32){
        bytes32 cardId = createCard(hash, hash_function, msg.sender);
        
        // send the card to "reach" random users
        
        //TODO: call chainlink VRF
        uint256 requestId;
        requestIdToData[requestId] = CardSpread(msg.sender, cardId);

        //TODO: call Galadriel for the tags
    }

    //TODO: callable by anyone
    function spreadCard(uint256 requestId) external {
        //TODO: from the mapping with randomInput, Maybe add a callback to user the chainlink VRF
        address user = requestIdToData[requestId].user;
        uint32 reach = userReach(user);
        address[] randomUsers = new address[](reach);
        for (uint i; i < randomUsers.length; ++i){
            enqueue(randomUsers[i], cardId, requestIdToData[requestId].user);
        }
    }

    function skipCard() external {
        InboxedCard card = dequeue(msg.sender);
        //TODO: increase userReputation
        updateReputation(true, card.previousPoster);
    }

    function repostCard() external {
        InboxedCard card = dequeue(msg.sender);
        //TODO: increase userReputation
        updateReputation(true, card.previousPoster);
        // TODO: call chainlink VRF + store in a mapping
    }
}