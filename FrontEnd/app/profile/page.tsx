import Footer from "@/components/layout-components/Footer";
import Header from "@/components/layout-components/Header";
import PostComponent from "@/components/Post/Post";
import ProfileBanner from "@/components/Profile/ProfileBanner";
import { Badge } from "@/components/ui/badge";
import { mockedPosts } from "@/types/Post";
import { mock } from "node:test";

const ProfilePage = () => {

    return (
        <>
            <Header />
            <div className="flex-1 container flex flex-col gap-1">
                <div>
                    <h1 className="text-white">Profile</h1>
                    <Badge>Verified</Badge>
                </div>
                <ProfileBanner />
                <h1>Your Posts</h1>
                <div className="flex flex-col gap-2">
                    {mockedPosts.map((post, index) => (
                        <PostComponent key={index} post={post} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;