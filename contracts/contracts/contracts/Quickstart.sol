// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.20;

// // Uncomment this line to use console.log
// // import "hardhat/console.sol";
// import "./interfaces/IOracle.sol";

// // @title Quickstart
// // @notice This contract interacts with teeML oracle to initiate calls for image generation using DALL-E.
// contract Quickstart {
//     // @notice Address of the contract owner
//     address private owner;

//     // @notice Address of the oracle contract
//     address public oracleAddress;

//     // @notice Last response received from the oracle
//     string public lastResponse;

//     // @notice Counter for the number of calls made
//     uint private callsCount;

//     // @notice Event emitted when the oracle address is updated
//     event OracleAddressUpdated(address indexed newOracleAddress);
    
//     IOracle.OpenAiRequest config;


//     // @param initialOracleAddress Initial address of the oracle contract
//     constructor(address initialOracleAddress) {
//         owner = msg.sender;
//         oracleAddress = initialOracleAddress;
//         config = IOracle.OpenAiRequest({
//             model : "gpt-4-turbo", // gpt-4-turbo gpt-4o
//             frequencyPenalty : 21, // > 20 for null
//             logitBias : "", // empty str for null
//             maxTokens : 1000, // 0 for null
//             presencePenalty : 21, // > 20 for null
//             responseFormat : "{\"type\":\"text\"}",
//             seed : 0, // null
//             stop : "", // null
//             temperature : 10, // Example temperature (scaled up, 10 means 1.0), > 20 means null
//             topP : 101, // Percentage 0-100, > 100 means null
//             tools : "",
//             toolChoice : "", // "none" or "auto"
//             user : "" // null
//         });
//     }

//     // @notice Ensures the caller is the contract owner
//     modifier onlyOwner() {
//         require(msg.sender == owner, "Caller is not owner");
//         _;
//     }

//     // @notice Ensures the caller is the oracle contract
//     modifier onlyOracle() {
//         require(msg.sender == oracleAddress, "Caller is not oracle");
//         _;
//     }

//     // @notice Updates the oracle address
//     // @param newOracleAddress The new oracle address to set
//     function setOracleAddress(address newOracleAddress) public onlyOwner {
//         oracleAddress = newOracleAddress;
//         emit OracleAddressUpdated(newOracleAddress);
//     }


//     // struct OpenAiRequest {
//     //     // "gpt-4-turbo", "gpt-4-turbo-preview" or "gpt-3.5-turbo-1106"
//     //     string model;
//     //     // int -20 - 20, Mapped to float -2.0 - 2.0. If bigger than 20 then null
//     //     int8 frequencyPenalty;
//     //     // JSON string or empty string
//     //     string logitBias;
//     //     // 0 for null
//     //     uint32 maxTokens;
//     //     // int -20 - 20, Mapped to float -2.0 - 2.0. If bigger than 20 then null
//     //     int8 presencePenalty;
//     //     // JSON string or empty string
//     //     string responseFormat;
//     //     // 0 for null
//     //     uint seed;
//     //     // empty str for null
//     //     string stop;
//     //     // 0-20, > 20 for null
//     //     uint temperature;
//     //     // 0-100  percentage, > 100 for null
//     //     uint topP;
//     //     // JSON list for tools in OpenAI format, empty for null, names have to match the supported tools
//     //     string tools;
//     //     // "none", "auto" or empty str which defaults to auto on OpenAI side
//     //     string toolChoice;
//     //     string user;
//     // }
//     // @notice Initializes a call to the oracle for image generation
//     // @param message The message or prompt for image generation
//     // @return The ID of the initiated call
//     function initializeDalleCall(string memory message) public returns (uint) {
//         uint currentId = callsCount;
//         callsCount = currentId + 1;
//         IOracle(oracleAddress).createOpenAiLlmCall(
//             currentId,
//             request
//         );

//         return currentId;
//     }

//     // @notice Handles the response from the oracle for the function call
//     // @param response The response from the oracle
//     // @param errorMessage Any error message
//     // @dev Called by teeML oracle
//     function onOracleFunctionResponse(
//         uint /*runId*/,
//         string memory response,
//         string memory errorMessage
//     ) public onlyOracle {
//         if (keccak256(abi.encodePacked(errorMessage)) != keccak256(abi.encodePacked(""))) {
//             lastResponse = errorMessage;
//         } else {
//             lastResponse = response;
//         }
//     }
// }
