// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
pragma abicoder v2;

import {AbstractInboxes, InboxedCard} from "./AbstractInboxes.sol";
import {AbstractGeneralizedInboxes} from "./AbstractGeneralizedInboxes.sol";
import {AbstractUser} from "./AbstractUser.sol";
import {IActions} from "./IActions.sol";
import {CardRegistry} from "./CardRegistry.sol";

import {VRFConsumerBaseV2Plus} from "chainlink/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "chainlink/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

// TODO: only owner
contract App is VRFConsumerBaseV2Plus, IActions, CardRegistry, AbstractInboxes, AbstractGeneralizedInboxes, AbstractUser{
    string[] ALLTAGS;
    address tagNfswSetterGaladriel;
    // subscriptionId: 68404686874014089213998579493500905828531299948922329510242288524861874420973 subscriptionID arb Sepolia Chainlink 
    constructor(address tagNfswSetter, uint256 subscriptionId) VRFConsumerBaseV2Plus(0x5CE8D5A2BC84beb22a398CCA51996F7930313D61) {
        s_subscriptionId = subscriptionId;
        tagNfswSetterGaladriel = tagNfswSetter;
    }

    function setAllTags(string[] memory  tags) external {
        ALLTAGS = tags;
    }

    function setGaladriel(address galadriel_) external {
        tagNfswSetterGaladriel = galadriel_;
    }

    function postCard(bytes32 hash, uint8 hash_function, string memory message) external returns (bytes32 cardId){
        cardId = createCard(hash, hash_function, message, msg.sender);
        
        if (tagNfswSetterGaladriel != address(0x0)){
            // call Galadriel for the tags
            (, bytes memory data) = payable(tagNfswSetterGaladriel).call(abi.encodeWithSelector(bytes4(keccak256("sendMessage")), message, ALLTAGS));
            (uint256 index) = abi.decode(data, (uint256));
            runIdToCardId[index] = cardId;
        }
        else {
            // call chainlink VRF
            uint32 reach = userReach(msg.sender);
            uint256 requestId = requestRandomWords(msg.sender, cardId, reach);
            s_requests[requestId].user = msg.sender;
            s_requests[requestId].cardId = cardId;
            s_requests[requestId].exists = true;
        }
    }

    ///// Galadriel
    mapping(uint256 => bytes32) internal runIdToCardId;

    // function setTagsAndSendInboxes
    function setTagsAndSendInboxes(uint256 runId, string[] memory tags) public {
        bytes32 cardId = runIdToCardId[runId];
        setTags(cardId, tags);
        // enque all inboxes
        for (uint i; i < tags.length; ++i){
            enqueue(tags[i], cardId, cards[cardId].initialPoster);
        }
    }

    function spreadCard(uint256 requestId) internal {
        for (uint i; i < s_requests[requestId].randomWords.length; ++i){
            address randomUser = users[s_requests[requestId].randomWords[i] % users.length];
            enqueue(randomUser, s_requests[requestId].cardId, s_requests[requestId].user);
        }
    }

    function skipCard() external {
        InboxedCard memory card = dequeue(msg.sender);
        // decrease user reputation
        updateReputation(false, card.previousPoster);
    }

    function repostCard() external {
        InboxedCard memory card = dequeue(msg.sender);
        // increase user reputation
        updateReputation(true, cards[card.cardId].initialPoster);
        updateReputation(true, card.previousPoster);
        // call chainlink VRF + store in a mapping
        uint32 reach = userReach(msg.sender);
        requestRandomWords(msg.sender, card.cardId, reach);
    }

    ////////// CHAINLINK
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
        address user;
        bytes32 cardId;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */

    // Your subscription ID.
    uint256 public s_subscriptionId;

    bytes32 public keyHash =
        0x1770bdc7eec7771f7ba4ffd640f34260d7f095b79c92d34a5b2551d6f6cfd2be;

    // Past request IDs.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // Assumes the subscription is funded sufficiently.
    // @param enableNativePayment: Set to `true` to enable payment in native tokens, or
    // `false` to pay in LINK
    function requestRandomWords(
        address user,
        bytes32 cardId, 
        uint32 reach
    ) internal returns (uint256 requestId) {
        bool enableNativePayment = true;
        // Will revert if subscription is not set and funded.
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: 3,
                callbackGasLimit: 100000,
                numWords: reach,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({
                        nativePayment: enableNativePayment
                    })
                )
            })
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false,
            user: user,
            cardId: cardId
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, reach);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] calldata _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
        spreadCard(_requestId);
    }
}