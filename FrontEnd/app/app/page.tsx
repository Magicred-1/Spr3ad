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
import Spline from '@splinetool/react-spline';
import Header from "@/components/layout-components/Header";
import Footer from "@/components/layout-components/Footer";

function AppHomePage() {
  const [userSetup, setUserSetup] = useState(true); // todo: change to false 
  const userWallets = useUserWallets();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
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
  const changeActiveCard = () => {
    setActiveCardIndex((prevIndex) => prevIndex + 1);
  };

  const checkIfUserSetup = () => {
    const address = userWallets[0].address;
    setUserSetup(true);
  };

  return (
    <>
      <Header />
      <div className="relative h-full flex items-center justify-center">
        <Spline
          scene="https://prod.spline.design/GzQFnTdbQCeOpknA/scene.splinecode"
          className="absolute inset-0 w-full h-full -z-20"
        />
        {!userSetup && <Onboarding refresh={checkIfUserSetup} />}
        {userSetup && posts && (
          <div className="h-full w-full  flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-full h-[34rem] ">
              {posts.map((post, index) => (
                index === activeCardIndex && (
                  <PostCard
                    key={index}
                    changeActiveCard={changeActiveCard}
                    post={post}
                  />
                )
              ))}
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
    </>
  );
}

export default AppHomePage;
