import { Post } from "@/types/Post";
import Image from "next/image";
import TinderCard from "react-tinder-card";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { getImageForUser, getNameForUser } from "../utils/getUserData";
import { BlockscoutTx } from "./BlockscoutTx";
import { Badge } from "../ui/badge";
import { usePublicClient, useWriteContract } from "wagmi";
import { getContract, testABI } from "@/lib/utils";
interface PostCardProps {
  post: Post;
  changeActiveCard: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  changeActiveCard,
}) => {
  const { writeContract } = useWriteContract();
  const publicClient = usePublicClient();

  const handleLike = async () => {
    const id = await publicClient?.getChainId()!;
    const testAddress = getContract("test", id);
    writeContract({
      abi: testABI,
      address: testAddress,
      functionName: "repost",
    });
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
    console.log("You swiped: " + direction);
    if (direction === "right") {
      handleLike().then(() => {});
      return;
    } else if (direction === "left") {
      handleSkip().then(() => {});
      return;
    }
  };
  const userName = getNameForUser(post.user);
  const userImage = getImageForUser(post.user);
  return (
    <TinderCard
      className="absolute overflow-hidden top-0 text-white shadow-inner border border-white/40 
bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50

              w-full h-full rounded-xl py-4 px-2"
      onSwipe={onSwipe}
      onCardLeftScreen={changeActiveCard}
      preventSwipe={["up", "down"]}
    >
      {post.isSponsored && (
        <div className="absolute top-5 -left-10 -rotate-[40deg]  w-fit text-sm text-white font-bold bg-blue-600 py-2 px-12 rounded-sm transition-all">
          FEATURED
        </div>
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
        <div className="w-full h-48 rounded-xl flex justify-center items-center ">
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
          <p className="text-center px-2 py-1 text-white bg-blue-600 rounded-lg">
            5 ${post.sponsoredToken} to earn
          </p>
        )}
      </div>
    </TinderCard>
  );
};
