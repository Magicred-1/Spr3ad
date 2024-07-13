import Footer from "@/components/layout-components/Footer";
import Header from "@/components/layout-components/Header";
import ProfileBanner from "@/components/Profile/ProfileBanner";

const ProfilePage = () => {

    return (
        <>
            <Header />
            <div className="flex-1 h-auto">
                <ProfileBanner />
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;