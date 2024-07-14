"use client"

import { Avatar, AvatarFallback } from "../ui/avatar";
import { DynamicWidget, useDynamicContext, useSocialAccounts, useUserWallets } from '@dynamic-labs/sdk-react-core'
import { AvatarImage } from "@radix-ui/react-avatar";
import { Copy } from 'lucide-react';
import Image from "next/image";
import { Button } from "../ui/button";


const shrinkString = (str: string, length: number) => {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

function ProfileBanner() {

    const dynamicContext = useDynamicContext();
    const userProfile = dynamicContext.user

    const userWallet = dynamicContext.primaryWallet
    const isLogged = dynamicContext.isAuthenticated || userProfile || userWallet
    const shrinkedWallet = shrinkString(userWallet?.address || '', 8)


    return (
        <div className="flex flex-col justify-center items-center bg-blue-900 rounded-lg ">

            {
                isLogged ? (<div className="flex items-center gap-4 p-2">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={"https://api.cloudnouns.com/v1/pfp?text="}
                            alt="avatar"
                            className="w-20 h-20 rounded-full"
                        >

                        </AvatarImage>
                        <AvatarFallback>

                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center gap-2">
                        <h1 className="text-xl font-bold text-white text-ellipsis">@{userProfile?.username || userProfile?.email || shrinkedWallet || 'unknow'}</h1>
                        {/* ENs domain or button to mint a subdomains  */}
                        {
                            userProfile?.ens ? <h1 className="text-lg text-white"></h1> : <Button className="text-white">Mint a subdomain</Button>
                        }
                        <div className="flex gap-2 text-white">
                            <p className="text-lg text-white">{shrinkedWallet}</p>
                            <Copy />
                        </div>
                    </div>
                </div>) :
                    (
                        <div className="flex flex-col gap-2 p-4 items-center justify-center min-h-20">
                            <h3 className="text-white">You are not Logged in</h3>
                            <DynamicWidget />
                        </div>
                    )
            }
        </div>);
}

export default ProfileBanner;