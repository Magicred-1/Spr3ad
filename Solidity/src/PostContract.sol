// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract PostContract{
    string[] cards;

    function postCard(string memory hash, string memory message) external {
        cards.push(hash);
    }

    function skip() public {
        delete cards[cards.length-1];
    }

    function repost() public {}
}