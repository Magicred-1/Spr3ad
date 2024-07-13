"use client";
import { useState, useEffect } from "react";
import { Post, mockedPosts } from "@/types/Post";
import { PostCard } from "@/components/general/PostCard";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Onboarding from "@/components/onboarding";
function AppHomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(mockedPosts.slice().reverse());
  }, []);

  const onCardLeftScreen = () => {
    console.log("1");
    // remove the first post from the list
    // const postsWithoutFirst = posts.slice(1);
    // console.log(postsWithoutFirst)
    // setPosts(postsWithoutFirst);
  };

  return (
    <div className="h-full flex items-center justify-center">
      {/* TODO: IF USER DOESNT EXISTS IN SMART CONTRACT : <Onboarding /> */}
      {posts ? (
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
              <p className="">Swipe to Like</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No more posts</p>
      )}
    </div>
  );
}

export default AppHomePage;
