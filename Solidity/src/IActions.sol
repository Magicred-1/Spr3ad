// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IActions {
    // enqueue the Card in the inbox + moneyFlow
    function postCard(bytes32 hash, uint8 hash_function, string calldata message) external returns (bytes32);

    // dequeue the Card + money flow
    function skipCard() external;

    // send the Card to X users + money flow
    function repostCard() external;
}
