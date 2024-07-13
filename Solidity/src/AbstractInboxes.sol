// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ICardRegistry, Card} from "./ICardRegistry.sol";

struct InboxedCard{
    bytes32 cardId;
    address previousPoster;
}

abstract contract AbstractInboxes {
    mapping(address => Inbox) internal userToInbox;
    struct Inbox {
        InboxedCard[] queue;
        uint256 front;
        uint256 rear;
    }

    event CardReceived(address user, bytes32 id);
    event CardRemoved(address user, bytes32 id);

    function enqueue(address user, bytes32 cardId, address previousPoster) internal {
        InboxedCard memory card = InboxedCard(cardId, previousPoster);
        userToInbox[user].queue.push(card);
        userToInbox[user].rear = userToInbox[user].queue.length - 1;
        emit CardReceived(user, cardId);
    }

    function dequeue(address user) internal returns (InboxedCard memory) {
        require(userToInbox[user].queue.length > 0, "Queue is empty");
        require(userToInbox[user].front <= userToInbox[user].rear, "Queue is empty");

        InboxedCard memory dequeuedCard = userToInbox[user].queue[userToInbox[user].front];
        delete userToInbox[user].queue[userToInbox[user].front];
        userToInbox[user].front++;

        emit CardRemoved(user, dequeuedCard.cardId);
        return dequeuedCard;
    }

    function peek(address user) public view returns (InboxedCard memory) {
        require(userToInbox[user].queue.length > 0, "Queue is empty");
        require(userToInbox[user].front <= userToInbox[user].rear, "Queue is empty");
        return userToInbox[user].queue[userToInbox[user].front];
    }

    function isEmpty(address user) public view returns (bool) {
        return userToInbox[user].queue.length == 0 || userToInbox[user].front > userToInbox[user].rear;
    }

    function size(address user) public view returns (uint256) {
        if (isEmpty(user)) {
            return 0;
        }
        return userToInbox[user].rear - userToInbox[user].front + 1;
    }
}
