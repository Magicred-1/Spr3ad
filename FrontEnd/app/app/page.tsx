"use client";
import { useState, useEffect } from "react";
import { Post, dataBy } from "@/types/Post";
import { PostCard } from "@/components/general/PostCard";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  usePublicClient,
  useReadContract,
  useSendTransaction,
  useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import Onboarding from "@/components/onboarding";
import { getContract, spreadABI, usdcABI } from "@/lib/utils";
import Header from "@/components/layout-components/Header";
import Spline from "@splinetool/react-spline";
import Footer from "@/components/layout-components/Footer";

function AppHomePage() {
  const [userSetup, setUserSetup] = useState(false); // todo: change to false
  const userWallets = useUserWallets();
  const publicClient = usePublicClient();
  const { writeContract } = useWriteContract();

  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  useEffect(() => {
    setPosts(dataBy.general.posts.slice().reverse());
  }, []);
  const { data: hash, sendTransaction } = useSendTransaction();

  const testTx = () => {
    sendTransaction({
      to: "0xDc10426c370aE5a3Ab124124A8837C695C3bbC90",
      value: parseEther("0"),
    });
  };
  const changeActiveCard = () => {
    setActiveCardIndex((prevIndex) => prevIndex + 1);
  };

  const checkIfUserSetup = async (refresh?: boolean) => {
    if (userWallets.length === 0) return;
    if (refresh) {
      setTimeout(() => {
        setUserSetup(true);
        localStorage.setItem("user", "true");
      }, 3000);
    }
    const address = userWallets[0].address;
    const id = await publicClient?.getChainId()!;
    const contractAddress = getContract("spread", id);
    const res = await publicClient!.readContract({
      abi: spreadABI,
      address: contractAddress,
      functionName: "userToTags",
      args: [address, 0],
    });
  };

  const mintUSDC = async () => {
    const id = await publicClient?.getChainId()!;
    const contractAddress = getContract("usdc", id);
    writeContract({
      abi: usdcABI,
      address: contractAddress,
      functionName: "mint",
      args: [userWallets[0].address, 2 * 10 ** 18],
    });
  };

  useEffect(() => {
    checkIfUserSetup();
    if (localStorage.getItem("user") === "true") {
      setUserSetup(true);
    }
  }, [userWallets]);

  return (
    <>
      <div className="relative h-full flex items-center justify-center">
        <Spline
          scene="https://prod.spline.design/GzQFnTdbQCeOpknA/scene.splinecode"
          className="absolute inset-0 w-full h-full -z-20"
        />
        {!userSetup && <Onboarding refresh={checkIfUserSetup} />}
        {userSetup && posts && (
          <div className="h-full w-full  flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-full h-[34rem] ">
              {posts.map(
                (post, index) =>
                  index === activeCardIndex && (
                    <PostCard
                      key={index}
                      changeActiveCard={changeActiveCard}
                      post={post}
                    />
                  )
              )}
            </div>
            <div className="w-full flex items-center justify-between mt-4 text-white">
              <div className="flex flex-col justify-center items-start">
                <ArrowLeftIcon size={32} />
                <p className="">Swipe to Skip</p>
              </div>
              <div className="flex flex-col justify-center items-end">
                <ArrowRightIcon size={32} />
                <p
                  className={`${
                    posts[activeCardIndex]?.isSponsored &&
                    "bg-blue-600 text-white px-2 py-1 rounded-lg"
                  }`}
                >
                  Swipe to
                  {posts[activeCardIndex]?.isSponsored ? " Earn" : " Spread"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AppHomePage;
