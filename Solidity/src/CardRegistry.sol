// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ICardRegistry, Card, Multihash} from "./ICardRegistry.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract CardRegistry {
    mapping(bytes32 => Card) public cards;

    function createCard(bytes32 hash, uint8 hash_function, string memory message, address initialPoster) internal returns(bytes32 cardId){
        Multihash memory cardHash = Multihash(hash, hash_function);
        Card memory card;
        card.uri = cardHash;
        card.message = message;
        card.initialPoster = initialPoster;
        cardId = bytes32(keccak256(abi.encode(card)));
        cards[cardId] = card;
    }

    function setTags(bytes32 cardId, string[] memory tags) internal {
        cards[cardId].tags = tags;
    }

    function setNFSW(bytes32 cardId, bool nfsw) external {
        cards[cardId].nfsw = nfsw;
    }
}
