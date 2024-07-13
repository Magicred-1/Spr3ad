import { Post } from "@/types/Post"
import Image from "next/image"
import TinderCard from 'react-tinder-card'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { getImageForUser, getNameForUser } from "../utils/getUserData"
import { BlockscoutTx } from "./BlockscoutTx"
import { Badge } from "../ui/badge"
interface PostCardProps {
    post: Post,
    changeActiveCard: () => void
}



export const PostCard: React.FC<PostCardProps> = ({ post, changeActiveCard }) => {

    const handleLike = () => {
        console.log('like')
    }

    const handleSkip = () => {
        console.log('skip')
    }

    const onSwipe = (direction: string) => {
        if (direction === 'right') {
            handleLike()
            return
        }
        else if (direction === 'left') {
            handleSkip()
            return
        }
    }
    const userName = getNameForUser(post.user)
    const userImage = getImageForUser(post.user)
    return (
        <TinderCard

            className="absolute top-0 text-white shadow-inner border border-white/40 
bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50

              w-full h-full rounded-xl py-4 px-2"
            onSwipe={onSwipe}
            onCardLeftScreen={changeActiveCard}
            preventSwipe={['up', 'down']}
        >

            <div className="relative flex flex-col items-center justify-evenly h-full">
                <div className="flex items-center gap-x-2">
                    <Image alt={userName} src={userImage} width={200} height={200} className="rounded-full w-10 h-10" />
                    <p>
                        {userName}
                    </p>
                </div>
                <div className="w-full h-48 rounded-xl flex justify-center items-center ">
                    {
                        post.mediaUrl
                            ? (
                                <Image className="rounded-xl w-full h-48 object-cover" alt={post.description} src={post.mediaUrl} width={300} height={300} />
                            ) : (
                                <p className="text-center text-shadow">
                                    {post.description}
                                </p>
                            )
                    }
                </div>

                <div>
                    {post.tags.map((tag, index) => (
                        <Badge variant={"secondary"} key={index}>
                            {tag}
                        </Badge>
                    ))}
                </div>
                {post.mediaUrl && (
                    <p className="text-center">
                        {post.description}
                    </p>
                )}
                {post.txHash && post.chainId && (

                    <BlockscoutTx txHash={post.txHash} chainId={post.chainId} />

                )
                }

            </div>
        </TinderCard >
    )
}