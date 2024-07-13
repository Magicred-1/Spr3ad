"use client"

import FileInput from "@/components/FileInput";
import Footer from "@/components/layout-components/Footer";
import Header from "@/components/layout-components/Header";
import PostComponent from "@/components/Post/Post";
import ProfileBanner from "@/components/Profile/ProfileBanner";
import { Badge } from "@/components/ui/badge";
import { mockedPosts } from "@/types/Post";
import WorldcoinButton from "@/components/WorldcoinButton";


const ProfilePage = () => {

    return (
        <>
            <Header />
            <div className="flex-1 container flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <h1 className="text-white">Profile</h1>
                    <WorldcoinButton />
                </div>
                <ProfileBanner />
                <h1>Your Posts</h1>
                <div className="flex flex-col gap-2">
                    {mockedPosts.map((post, index) => (
                        <PostComponent key={index} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProfilePage;