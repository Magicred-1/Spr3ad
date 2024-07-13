import { Post } from "@/types/Post"
import Image from "next/image"
import TinderCard from 'react-tinder-card'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
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
    return (
        <TinderCard 
        onCardLeftScreen={onCardLeftScreen}
        className="absolute top-0 bg-gray-200 w-full h-full rounded-xl shadow-xl py-4 px-2" 
        onSwipe={onSwipe} 
        preventSwipe={['up', 'down']}
        >
            <div className="absolute left-0 top-4 flex items-center bg-blur">
                <Image alt={post.user.name} src={post.user.img} width={50} height={50} className="rounded-full" />
                <p>
                    {post.user.name}
                </p>
            </div>
            <div className="flex flex-col items-center justify-evenly h-full">
                <Image className="rounded-xl w-full h-48 object-cover" alt={post.description} src={post.mediaUrl ? post.mediaUrl : "/defaultPost.jpg"}  width={300} height={300} />
                <p className="text-center">
                        {post.description}
                    </p>
                <p> 
                    {post.title}
                </p>
                <div>
                    {post.tags.map((tag, index) => (
                        <span key={index} className="text-white bg-blue-950 rounded-md px-2 py-1 mx-1">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </TinderCard>
    )
}