// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// Every Card data is created and stored here

struct Multihash {
    bytes32 hash;
    uint8 hash_function;
}

struct Card{
    Multihash uri;
    address initialPoster;
    string[] tags;
    bool nfsw;
}

interface ICardRegistry {
    function cards(bytes32 cardId) external view returns(Card memory);

    // enqueue the Card in the inbox
    function createCard(bytes32 hash, uint8 hash_function, address initialPoster) external returns (bytes32);

    // callback function for admin
    function setTags(bytes32 cardId, string[] calldata tags) external;

    // callback function for admin
    function setNFSW(bytes32 cardId, bool nfsw) external;
}
