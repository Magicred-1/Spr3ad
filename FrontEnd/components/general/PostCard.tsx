import { Post } from "@/types/Post";
import Image from "next/image";
import TinderCard from "react-tinder-card";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { getImageForUser, getNameForUser } from "../utils/getUserData";
import { BlockscoutTx } from "./BlockscoutTx";
import { Badge } from "../ui/badge";
import {
  useAccount,
  usePublicClient,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { parseEther, zeroAddress } from "viem";
import { toast } from "sonner";
import { getContract, testABI } from "@/lib/utils";
import { galadrielABI, spreadABI, user_tags } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  changeActiveCard: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  changeActiveCard,
}) => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: hash, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleLike = async () => {
    console.log(address);
    console.log("like");
    if (!address) {
      return;
    }
    const id = await publicClient?.getChainId()!;
    let erc20Address = getContract("usdc", id);
    try {
      const testAddress = getContract("test", id);
      writeContract({
        abi: testABI,
        address: testAddress,
        functionName: "repost",
      });
    } catch (error) {
      console.log(error);
    }

    if (post.sponsoredToken === "APE") {
      erc20Address = "0x06daeD3902Cac6C56B6906F150A54882A07Ebe10";
    }

    if (post.isSponsored && post.sponsoredToken) {
      writeContract({
        address: erc20Address || zeroAddress,
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "initialOwner",
                type: "address",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "allowance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
              },
            ],
            name: "ERC20InsufficientAllowance",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
              },
            ],
            name: "ERC20InsufficientBalance",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "approver",
                type: "address",
              },
            ],
            name: "ERC20InvalidApprover",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "receiver",
                type: "address",
              },
            ],
            name: "ERC20InvalidReceiver",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
            ],
            name: "ERC20InvalidSender",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "ERC20InvalidSpender",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "allowance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [
              {
                internalType: "uint8",
                name: "",
                type: "uint8",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalSupply",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "transfer",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "transferFrom",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "mint",
        args: [address, parseEther("50")],
      });

      console.table({
        address,
        post,
        hash,
        isConfirming,
        isConfirmed,
      });

      console.log(error);

      toast.success(`You received ${50} USDC !`);
    }
  };

  const handleSkip = async () => {
    const id = await publicClient?.getChainId()!;
    const testAddress = getContract("test", id);
    writeContract({
      abi: testABI,
      address: testAddress,
      functionName: "skip",
    });
  };

  const onSwipe = (direction: string) => {
    if (direction === "right") {
      handleLike();
      return;
    } else if (direction === "left") {
      handleSkip();
      return;
    }
  };

  const userName = getNameForUser(post.user);
  const userImage = getImageForUser(post.user);

  return (
    <TinderCard
      className="absolute top-0 text-white shadow-inner border border-white/40 overflow-hidden
                      bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50
                      w-full h-full rounded-xl py-4 px-2"
      onSwipe={onSwipe}
      onCardLeftScreen={changeActiveCard}
      preventSwipe={["up", "down"]}
    >
      {post.isSponsored && (
        <p className="absolute px-10 py-1 bg-blue-600 text-white top-5 -left-10 -rotate-[40deg]">
          FEATURED
        </p>
      )}
      <div className="relative flex flex-col items-center justify-evenly h-full">
        <div className="flex items-center gap-x-2">
          <Image
            alt={userName}
            src={userImage}
            width={200}
            height={200}
            className="rounded-full w-10 h-10"
          />
          <p>{userName}</p>
        </div>
        <div className="w-full h-48 rounded-xl flex justify-center items-center">
          {post.mediaUrl ? (
            <Image
              className="rounded-xl w-full h-48 object-cover"
              alt={post.description}
              src={post.mediaUrl}
              width={300}
              height={300}
            />
          ) : (
            <p className="text-center text-shadow">{post.description}</p>
          )}
        </div>

        {isConfirmed &&
          toast.success("You have earned 50 tokens! txHash: " + hash)}

        {isConfirming && toast.loading("Retrieving tokens ..")}
        <div className="flex text-center gap-2">
          {post.tags.map((tag, index) => (
            <Badge variant={"secondary"} key={index}>
              {tag}
            </Badge>
          ))}
        </div>
        {post.mediaUrl && <p className="text-center">{post.description}</p>}
        {post.txHash && post.chainId && (
          <BlockscoutTx txHash={post.txHash} chainId={post.chainId} />
        )}
        {post.isSponsored && (
          <p className=" px-2 py-1 bg-blue-600 text-white rounded-lg">
            EARN 50 ${post.sponsoredToken}
          </p>
        )}
      </div>
    </TinderCard>
  );
};
