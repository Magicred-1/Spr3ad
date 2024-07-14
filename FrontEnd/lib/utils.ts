import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { customEVMChains } from "./utils/DynamicWagmiProvider"
import { dataBy } from "@/types/Post"
import {
  mainnet,
  arbitrumSepolia,
  baseSepolia,
  scrollSepolia,
  morphHolesky,
  rootstockTestnet,
  neonDevnet,
  zircuitTestnet,
} from "viem/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const user_tags = dataBy.general.tags
export const user_posts = dataBy.general.posts


// https://explorer.galadriel.com/address/0x68EC9556830AD097D661Df2557FBCeC166a0A075 -> EXPLORER POUR WATCH OPEN AI RESPONSE
// THEGRAPH https://thegraph.com/explorer/subgraphs/EKYuDy59ZZvn82cJkpbtSWtkJJap5qDongmpNz3xcRZc?view=Query&chain=mainnet
// contract https://explorer.galadriel.com/address/0xF7a8Bbea3449585CB93c7852B8A3ddE6B0164F21

export const contracts = {
  [customEVMChains[0].chainId]: {
    "usdc": "0x2AC06739b05ED9D93f55E8e7c4396215bf3865CD",
    "galadriel": "0x4f1d722Be554DaAf0d2B934B29ABEA464bF8C6E7",
    "spread": "0xBa6F3e72A5Eb4474cf66E4Db09CAbc5fE232131F",
    "test": "0xF7a8Bbea3449585CB93c7852B8A3ddE6B0164F21"
  },
  [arbitrumSepolia.id]: {
    "usdc": "",
    "test" :"0xF7a8Bbea3449585CB93c7852B8A3ddE6B0164F21",
    "spread": "0x3524B1C716224B5F35A3424AcD692DFEE55eCB70"
  },
  [scrollSepolia.id]: {
    "usdc": "0x60b8E1A41aCeDa554d78412B2A6B8f2004b99E72",
    "test" :"0xF825E65922A895477687d3C04A0A5c2F5d3cDdD4",
    "spread": "0xA458600Ed05e09239ED5d9103453E7B62e8f0018"
  },
  [baseSepolia.id]: {
    "usdc": "0x6A7AfF1B6cB6313e67E57D008563739922EeA809",
    "test" :"0x660391f83496F7F434d4CbB53BbA22c54FFd7102",
    "spread": "0xBa6F3e72A5Eb4474cf66E4Db09CAbc5fE232131F"
  }

}

export const getContract = (name: "usdc" | "galadriel" | "spread" | "test", chainId: number): `0x${string}` => {
  return contracts[chainId][name] as `0x${string}`
}

export const testABI = [{ "type": "function", "name": "postCard", "inputs": [{ "name": "hash", "type": "string", "internalType": "string" }, { "name": "message", "type": "string", "internalType": "string" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "repost", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "skip", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }]

export const galadrielABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "initialOracleAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "getMessageHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "role",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "contentType",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "value",
                "type": "string"
              }
            ],
            "internalType": "struct IOracle.Content[]",
            "name": "content",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct IOracle.Message[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "runId",
        "type": "uint256"
      }
    ],
    "name": "getResponse",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "message",
    "outputs": [
      {
        "internalType": "string",
        "name": "role",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "runId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "id",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "functionName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "functionArguments",
            "type": "string"
          },
          {
            "internalType": "uint64",
            "name": "created",
            "type": "uint64"
          },
          {
            "internalType": "string",
            "name": "model",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "systemFingerprint",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "object",
            "type": "string"
          },
          {
            "internalType": "uint32",
            "name": "completionTokens",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "promptTokens",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "totalTokens",
            "type": "uint32"
          }
        ],
        "internalType": "struct IOracle.OpenAiResponse",
        "name": "_response",
        "type": "tuple"
      },
      {
        "internalType": "string",
        "name": "_errorMessage",
        "type": "string"
      }
    ],
    "name": "onOracleOpenAiLlmResponse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "responses",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "tags",
        "type": "string[]"
      }
    ],
    "name": "sendMessage",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const spreadABI = [{ "type": "constructor", "inputs": [{ "name": "tagNfswSetter", "type": "address", "internalType": "address" }, { "name": "subscriptionId", "type": "uint256", "internalType": "uint256" }], "stateMutability": "nonpayable" }, { "type": "function", "name": "CardsSeenByUser", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "bytes32", "internalType": "bytes32" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "acceptOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "cards", "inputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "outputs": [{ "name": "uri", "type": "tuple", "internalType": "struct Multihash", "components": [{ "name": "hash", "type": "bytes32", "internalType": "bytes32" }, { "name": "hash_function", "type": "uint8", "internalType": "uint8" }] }, { "name": "message", "type": "string", "internalType": "string" }, { "name": "initialPoster", "type": "address", "internalType": "address" }, { "name": "nfsw", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "isEmpty", "inputs": [{ "name": "tag", "type": "string", "internalType": "string" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "isEmpty", "inputs": [{ "name": "user", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "keyHash", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" }, { "type": "function", "name": "lastRequestId", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "owner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "peek", "inputs": [{ "name": "user", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "tuple", "internalType": "struct InboxedCard", "components": [{ "name": "cardId", "type": "bytes32", "internalType": "bytes32" }, { "name": "previousPoster", "type": "address", "internalType": "address" }] }], "stateMutability": "view" }, { "type": "function", "name": "peek", "inputs": [{ "name": "tag", "type": "string", "internalType": "string" }], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" }, { "type": "function", "name": "postCard", "inputs": [{ "name": "hash", "type": "bytes32", "internalType": "bytes32" }, { "name": "hash_function", "type": "uint8", "internalType": "uint8" }, { "name": "message", "type": "string", "internalType": "string" }], "outputs": [{ "name": "cardId", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "nonpayable" }, { "type": "function", "name": "rawFulfillRandomWords", "inputs": [{ "name": "requestId", "type": "uint256", "internalType": "uint256" }, { "name": "randomWords", "type": "uint256[]", "internalType": "uint256[]" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "repostCard", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "requestIds", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "s_requests", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "fulfilled", "type": "bool", "internalType": "bool" }, { "name": "exists", "type": "bool", "internalType": "bool" }, { "name": "user", "type": "address", "internalType": "address" }, { "name": "cardId", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" }, { "type": "function", "name": "s_subscriptionId", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "s_vrfCoordinator", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract IVRFCoordinatorV2Plus" }], "stateMutability": "view" }, { "type": "function", "name": "setAllTags", "inputs": [{ "name": "tags", "type": "string[]", "internalType": "string[]" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setCoordinator", "inputs": [{ "name": "_vrfCoordinator", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setGaladriel", "inputs": [{ "name": "galadriel_", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setNFSW", "inputs": [{ "name": "cardId", "type": "bytes32", "internalType": "bytes32" }, { "name": "nfsw", "type": "bool", "internalType": "bool" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setTagsAndSendInboxes", "inputs": [{ "name": "runId", "type": "uint256", "internalType": "uint256" }, { "name": "tags", "type": "string[]", "internalType": "string[]" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setupUser", "inputs": [{ "name": "tags", "type": "string[]", "internalType": "string[]" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "size", "inputs": [{ "name": "user", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "size", "inputs": [{ "name": "tag", "type": "string", "internalType": "string" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "skipCard", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "tagToInbox", "inputs": [{ "name": "", "type": "string", "internalType": "string" }], "outputs": [{ "name": "front", "type": "uint256", "internalType": "uint256" }, { "name": "rear", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "transferOwnership", "inputs": [{ "name": "to", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "userReach", "inputs": [{ "name": "user", "type": "address", "internalType": "address" }], "outputs": [{ "name": "reach", "type": "uint32", "internalType": "uint32" }], "stateMutability": "view" }, { "type": "function", "name": "userToTags", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, { "type": "event", "name": "CardReceived", "inputs": [{ "name": "tag", "type": "string", "indexed": false, "internalType": "string" }, { "name": "id", "type": "bytes32", "indexed": false, "internalType": "bytes32" }], "anonymous": false }, { "type": "event", "name": "CardReceived", "inputs": [{ "name": "user", "type": "address", "indexed": false, "internalType": "address" }, { "name": "id", "type": "bytes32", "indexed": false, "internalType": "bytes32" }], "anonymous": false }, { "type": "event", "name": "CardRemoved", "inputs": [{ "name": "tag", "type": "string", "indexed": false, "internalType": "string" }, { "name": "id", "type": "bytes32", "indexed": false, "internalType": "bytes32" }], "anonymous": false }, { "type": "event", "name": "CardRemoved", "inputs": [{ "name": "user", "type": "address", "indexed": false, "internalType": "address" }, { "name": "id", "type": "bytes32", "indexed": false, "internalType": "bytes32" }], "anonymous": false }, { "type": "event", "name": "CoordinatorSet", "inputs": [{ "name": "vrfCoordinator", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferRequested", "inputs": [{ "name": "from", "type": "address", "indexed": true, "internalType": "address" }, { "name": "to", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "name": "from", "type": "address", "indexed": true, "internalType": "address" }, { "name": "to", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "RequestFulfilled", "inputs": [{ "name": "requestId", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "randomWords", "type": "uint256[]", "indexed": false, "internalType": "uint256[]" }], "anonymous": false }, { "type": "event", "name": "RequestSent", "inputs": [{ "name": "requestId", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "numWords", "type": "uint32", "indexed": false, "internalType": "uint32" }], "anonymous": false }, { "type": "event", "name": "UserCreated", "inputs": [{ "name": "user", "type": "address", "indexed": false, "internalType": "address" }, { "name": "tags", "type": "string[]", "indexed": false, "internalType": "string[]" }], "anonymous": false }, { "type": "error", "name": "OnlyCoordinatorCanFulfill", "inputs": [{ "name": "have", "type": "address", "internalType": "address" }, { "name": "want", "type": "address", "internalType": "address" }] }, { "type": "error", "name": "OnlyOwnerOrCoordinator", "inputs": [{ "name": "have", "type": "address", "internalType": "address" }, { "name": "owner", "type": "address", "internalType": "address" }, { "name": "coordinator", "type": "address", "internalType": "address" }] }, { "type": "error", "name": "ZeroAddress", "inputs": [] }]
export const usdcABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ECDSAInvalidSignature",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      }
    ],
    "name": "ECDSAInvalidSignatureLength",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "ECDSAInvalidSignatureS",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "ERC2612ExpiredSignature",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "signer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC2612InvalidSigner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "currentNonce",
        "type": "uint256"
      }
    ],
    "name": "InvalidAccountNonce",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidShortString",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "str",
        "type": "string"
      }
    ],
    "name": "StringTooLong",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "EIP712DomainChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "eip712Domain",
    "outputs": [
      {
        "internalType": "bytes1",
        "name": "fields",
        "type": "bytes1"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "version",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "verifyingContract",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "salt",
        "type": "bytes32"
      },
      {
        "internalType": "uint256[]",
        "name": "extensions",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "nonces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "permit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]