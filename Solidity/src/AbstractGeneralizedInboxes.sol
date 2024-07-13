// this is an inbox with a seen mapping

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ICardRegistry, Card} from "./ICardRegistry.sol";

struct InboxedCard{
    bytes32 cardId;
    address previousPoster;
}

struct Inbox {
        InboxedCard[] queue;
        uint256 front;
        uint256 rear;
    }

abstract contract AbstractGeneralizedInboxes {
    mapping(address => mapping(bytes32 => bool)) public CardsSeenByUser;
    mapping(string => Inbox) public tagToInbox;
    

    event CardReceived(string tag, bytes32 id);
    event CardRemoved(string tag, bytes32 id);

    function enqueue(string memory tag, bytes32 cardId, address previousPoster) internal {
        InboxedCard memory card = InboxedCard(cardId, previousPoster);
        tagToInbox[tag].queue.push(card);
        tagToInbox[tag].rear = tagToInbox[tag].queue.length - 1;
        emit CardReceived(tag, cardId);
    }

    function dequeue(string memory tag) internal returns (bytes32) {
        require(tagToInbox[tag].queue.length > 0, "Queue is empty");
        require(tagToInbox[tag].front <= tagToInbox[tag].rear, "Queue is empty");

        InboxedCard memory dequeuedCard = tagToInbox[tag].queue[tagToInbox[tag].front];
        delete tagToInbox[tag].queue[tagToInbox[tag].front];
        tagToInbox[tag].front++;

        emit CardRemoved(tag, dequeuedCard.cardId);
        return dequeuedCard.cardId;
    }

    function peek(string memory tag) public view returns (bytes32) {
        require(tagToInbox[tag].queue.length > 0, "Queue is empty");
        require(tagToInbox[tag].front <= tagToInbox[tag].rear, "Queue is empty");
        return tagToInbox[tag].queue[tagToInbox[tag].front].cardId;
    }

    function isEmpty(string memory tag) public view returns (bool) {
        return tagToInbox[tag].queue.length == 0 || tagToInbox[tag].front > tagToInbox[tag].rear;
    }

    function size(string memory tag) public view returns (uint256) {
        if (isEmpty(tag)) {
            return 0;
        }
        return tagToInbox[tag].rear - tagToInbox[tag].front + 1;
    }
}