import { Post } from "@/types/Post"
import Image from "next/image"
import TinderCard from 'react-tinder-card'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { getImageForUser, getNameForUser } from "../utils/getUserData"
interface PostCardProps {
    post: Post,
    onCardLeftScreen: () => void
}

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

export const PostCard: React.FC<PostCardProps> = ({ post, onCardLeftScreen }) => {
    const userName = getNameForUser(post.user)
    const userImage = getImageForUser(post.user)
    return (
        <TinderCard
            onCardLeftScreen={onCardLeftScreen}
            className="absolute top-0 bg-gray-200 w-full h-full rounded-xl shadow-xl py-4 px-2"
            onSwipe={onSwipe}
            preventSwipe={['up', 'down']}
        >

            <div className="flex flex-col items-center justify-evenly h-full">
                <div className="flex items-center bg-blur gap-x-2">
                    <Image alt={userName} src={userImage} width={200} height={200} className="rounded-full w-10 h-10" />
                    <p>
                        {userName}
                    </p>
                </div>
                <div className="w-full h-48 rounded-xl flex justify-center items-center">
                    {
                        post.mediaUrl
                            ? (
                                <Image className="rounded-xl w-full h-48 object-cover" alt={post.description} src={post.mediaUrl} width={300} height={300} />
                            ) : (
                                <p className="text-center">
                                    {post.description}
                                </p>
                            )
                    }
                </div>

                <div>
                    {post.tags.map((tag, index) => (
                        <span key={index} className="text-white bg-blue-950 rounded-md px-2 py-1 mx-1">
                            {tag}
                        </span>
                    ))}
                </div>
                {post.mediaUrl && (
                    <p className="text-center">
                        {post.description}
                    </p>
                )}


            </div>
        </TinderCard>
    )
}