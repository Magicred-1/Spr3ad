"use client"

import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDynamicContext, useSocialAccounts, useUserWallets } from '@dynamic-labs/sdk-react-core'
import { Copy } from 'lucide-react';
import Image from "next/image";


const shrinkString = (str: string, length: number) => {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

function ProfileBanner() {

    const dynamicContext = useDynamicContext();

    const userProfile = dynamicContext.user
    const userWallet = dynamicContext.primaryWallet
    const isLogged = dynamicContext.isAuthenticated && userProfile !== null && userWallet !== null
    const shrinkedWallet = shrinkString(userWallet?.address || '', 8)

    return (
        <div className="flex flex-col justify-center items-center bg-blue-900 ">

            {
                isLogged ? (<div className="flex items-center gap-2">
                    
                    <div className="flex flex-col justify-center gap-2">
                        <h1 className="text-3xl font-bold text-white">{userProfile?.username || userProfile?.email || shrinkedWallet || 'unknow'}</h1>
                        <div className="flex gap-2 text-white">
                            <p className="text-lg text-white">{shrinkedWallet}</p>
                            <Copy />
                        </div>
                    </div>
                </div>) : 
                (
                    <h3>You are not Logged in</h3>
                )
            }
        </div>);
}

export default ProfileBanner;