"use client";
import { useState, useEffect } from "react";
import { Post, mockedPosts } from "@/types/Post";
import { PostCard } from "@/components/general/PostCard";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import Onboarding from "@/components/onboarding";

function AppHomePage() {
  const [userSetup, setUserSetup] = useState(true); // todo: change to false 
  const userWallets = useUserWallets();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(mockedPosts.slice().reverse());
  }, []);
  const { data: hash, sendTransaction } = useSendTransaction();

  const testTx = () => {
    sendTransaction({
      to: "0xDc10426c370aE5a3Ab124124A8837C695C3bbC90",
      value: parseEther("0"),
    });
  };
  const onCardLeftScreen = () => {
    console.log("1");
    // remove the first post from the list
    // const postsWithoutFirst = posts.slice(1);
    // console.log(postsWithoutFirst)
    // setPosts(postsWithoutFirst);
  };

  const checkIfUserSetup = () => {
    const address = userWallets[0].address;
    setUserSetup(true);
  };

  return (
    <div className="h-full flex items-center justify-center">
      {!userSetup && <Onboarding refresh={checkIfUserSetup} />}
      {userSetup && posts && (
        <div className="h-full w-full  flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-full h-[34rem] ">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                onCardLeftScreen={onCardLeftScreen}
                post={post}
              />
            ))}
            <p>No more posts</p>
          </div>
          <div className="w-full flex items-center justify-between mt-4 text-white">
            <div className="flex flex-col justify-center items-start">
              <ArrowLeftIcon size={32} />
              <p className="">Swipe to Skip</p>
            </div>
            <div className="flex flex-col justify-center items-end">
              <ArrowRightIcon size={32} />
              <p className="">Swipe to Spread</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppHomePage;
