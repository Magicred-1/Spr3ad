// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {App} from "../src/App.sol";

contract AppScript is Script {
    App APPLICATION;
    address tagNfswSetterGaladriel;
    uint256 subscriptionId;
    string[] tags;

    function setUp() public {
        tagNfswSetterGaladriel = 0xb27FeCed5a3E1aeB257F055C3b47E792612C0972;
        subscriptionId = 68404686874014089213998579493500905828531299948922329510242288524861874420973;
    }

    function run() public {
        vm.startBroadcast();
        APPLICATION = new App(tagNfswSetterGaladriel, subscriptionId);
        //APPLICATION = App(0xBa6F3e72A5Eb4474cf66E4Db09CAbc5fE232131F);
        setGaladriel();
        setTags();
    }

    function setTags() public{
        tags.push("ApeCoin Holder");
        tags.push("BoredApe Holder");
        tags.push("Layer2 user");
        tags.push("NFT Enthusiast");
        tags.push("Metaverse Explorer");
        tags.push("DAO Member");
        tags.push("DeFi Participant");
        tags.push("Web3 Developer");
        tags.push("Crypto Trader");
        tags.push("Token Staker");
        APPLICATION.setAllTags(tags);
    }

    function setGaladriel() public{
        APPLICATION.setGaladriel(0x4f1d722Be554DaAf0d2B934B29ABEA464bF8C6E7);
    }
}
