import { Post } from "@/types/Post";
import Image from "next/image";
import { Badge } from "../ui/badge";

function PostComponent({ post }: {
    post: Post
}) {
    return (
        <div className="flex flex-col rounded-md bg-blue-950 min-h-48 p-2">
            <h3 className="text-white text-lg font-bold">{post.title}</h3>

            {post.mediaUrl && (<div className="flex items-center gap-4 p-2">
                <Image alt={"postImage"} src={post.mediaUrl} width={200} height={200} className="rounded-full w-10 h-10" />
            </div>)}
            <p className="text-white text-base flex-1">{post.description}</p>
            <div className="flex gap-2">
                {
                    post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))
                }
            </div>




        </div>);
}

export default PostComponent;