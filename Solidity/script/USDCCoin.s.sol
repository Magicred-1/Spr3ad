// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {USDCCoin} from "../src/USDCCoin.sol";

contract USDCScript is Script {
    USDCCoin usdc;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        usdc = new USDCCoin(address(0x0));
    }
}
