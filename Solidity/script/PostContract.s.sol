// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {PostContract} from "../src/PostContract.sol";

contract PostContractScript is Script {
    PostContract pc;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        pc = new PostContract();
    }
}
