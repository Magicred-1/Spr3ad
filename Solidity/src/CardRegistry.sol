// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ICardRegistry, Card, Multihash} from "./ICardRegistry.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract CardRegistry is Ownable{
    mapping(bytes32 => Card) public cards;

    constructor(address galadriel) Ownable(galadriel){}

    function createCard(bytes32 hash, uint8 hash_function) internal returns(bytes32 cardId){
        Multihash cardHash = Multihash(hash, hash_function);
        Card card = Card(cardHash, msg.sender);
        cardId = bytes32(keccak256(card));
    }

    function setTags(bytes32 cardId, string[] calldata tags) external onlyOwner {
        cards[cardId].tags = tags;
    }

    function setNFSW(bytes32 cardId, bool nfsw) external onlyOwner {
        cards[cardId].nfsw = nfsw;
    }
}
