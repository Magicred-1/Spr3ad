// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./interfaces/IOracle.sol";

interface Spread {
    function setTagsAndSendInboxes(uint256 runId, string[] calldata tags) external;
}

contract OpenAiSimpleLLM {
    address private oracleAddress; // use latest: https://docs.galadriel.com/oracle-address
    IOracle.Message public message;
    mapping(uint => string) public responses;
    IOracle.OpenAiRequest private config;
    string private request_obligation = "FOR THE FOLLOWING REQUEST, I WILL GIVE YOU AN ARRAY OF TAGS AND YOU MUST MATCH THE TAGS TO THE TEXT BEING SENT. IF YOU DO NOT FIND ANY MATCH, ANSWER WITH 'NO_TAGS'. IF YOU FIND A MATCH, ANSWER WITH AN ARRAY OF THE TAGS THAT MATCH THE TEXT. IF YOU FIND MULTIPLE MATCHES, ANSWER WITH AN ARRAY OF ALL MATCHES LIKE SO tag1,tag2,tag3";

    constructor(address initialOracleAddress) {
        oracleAddress = initialOracleAddress;

        config = IOracle.OpenAiRequest({
            model : "gpt-4-turbo", // gpt-4-turbo gpt-4o
            frequencyPenalty : 21, // > 20 for null
            logitBias : "", // empty str for null
            maxTokens : 1000, // 0 for null
            presencePenalty : 21, // > 20 for null
            responseFormat : "{\"type\":\"text\"}",
            seed : 0, // null
            stop : "", // null
            temperature : 10, // Example temperature (scaled up, 10 means 1.0), > 20 means null
            topP : 101, // Percentage 0-100, > 100 means null
            tools : "",
            toolChoice : "", // "none" or "auto"
            user : "" // null
        });
    }

    function getResponse(uint runId) public view returns (string[] memory) {
        string memory response = responses[runId];
        // response should be in the format "tag1,tag2,tag3"
        // Split the response string into an array
        bytes memory responseBytes = bytes(response);
        uint commaCount = 0;
        for (uint i = 0; i < responseBytes.length; i++) {
            if (responseBytes[i] == ',') {
                commaCount++;
            }
        }
        
        string[] memory tags = new string[](commaCount + 1);
        uint currentIndex = 0;
        uint lastCommaIndex = 0;
        
        for (uint i = 0; i <= responseBytes.length; i++) {
            if (i == responseBytes.length || responseBytes[i] == ',') {
                uint length = i - lastCommaIndex;
                bytes memory tagBytes = new bytes(length);
                for (uint j = 0; j < length; j++) {
                    tagBytes[j] = responseBytes[lastCommaIndex + j];
                }
                tags[currentIndex] = string(tagBytes);
                currentIndex++;
                lastCommaIndex = i + 1;
            }
        }
        
        return tags;
    }

    function sendMessage(string memory _message, string[] memory tags) public returns (uint){
        message = createTextMessage("user", _message, tags);
        uint id = IOracle(oracleAddress).createOpenAiLlmCall(0, config);
        return id;
    }

    // required for Oracle
    function onOracleOpenAiLlmResponse(
        uint runId,
        IOracle.OpenAiResponse memory _response,
        string memory _errorMessage
    ) public {
        require(msg.sender == oracleAddress, "Caller is not oracle");
        if (bytes(_errorMessage).length > 0) {
            responses[runId] = _errorMessage;
        } else {
            responses[runId] = _response.content;
            string[] memory tags = getResponse(runId);
            Spread spread = Spread(0x35b97f170f439f4C411fAA9076B38A6Bd0BF2247);
            spread.setTagsAndSendInboxes(runId, tags);
        }
    }

    // required for Oracle
    function getMessageHistory(
        uint /*_runId*/
    ) public view returns (IOracle.Message[] memory) {
        IOracle.Message[] memory messages = new IOracle.Message[](1);
        messages[0] = message;
        return messages;
    }

    // @notice Creates a text message with the given role and content
    // @param role The role of the message
    // @param content The content of the message
    // @return The created message
    function createTextMessage(string memory role, string memory content, string[] memory tags) private view returns (IOracle.Message memory) {
        string memory prompt = string(abi.encodePacked(request_obligation, " HERE ARE THE TAGS: "));
        for (uint i = 0; i < tags.length; i++) {
            string memory tag = tags[i];
            if (i != tags.length - 1) tag = string(abi.encodePacked(tag, ","));
            prompt = string(abi.encodePacked(prompt, tag));
        }
        prompt = string(abi.encodePacked(prompt, ". THE TEXT IS: ", content));
        IOracle.Message memory newMessage = IOracle.Message({
        role : role,
        content : new IOracle.Content[](1)
        });
        newMessage.content[0].contentType = "text";
        newMessage.content[0].value = prompt;
        return newMessage;
    }
}
