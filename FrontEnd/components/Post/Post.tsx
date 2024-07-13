"use client";

import { Post } from "@/types/Post";
import Image from "next/image";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Bitcoin, Copy, Eye } from "lucide-react";
import { usePublicClient } from "wagmi";
import { getContract, spreadABI } from "@/lib/utils";

function PostComponent({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-blue-950 min-h-48 p-2">
      <h3 className="text-white text-lg font-bold">{post.title}</h3>

      {post.mediaUrl && (
        <div className="w-40 h-40 flex items-center justify-center">
          <Image
            alt={"postImage"}
            width={350}
            height={200}
            style={{ objectFit: "cover" }}
            src={post.mediaUrl}
            className=""
          />
        </div>
      )}
      <p className="text-white text-base flex-1">{post.description}</p>
      <div className="flex gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <Badge>
          <div className="flex gap-2 items-center">
            <Eye />
            <p className="text-white">{post.views || 0}</p>
          </div>
        </Badge>

        <Badge>
          <div className="flex gap-2 items-center">
            <Bitcoin />
            <p className="text-white">{post.endorses || 0}</p>
          </div>
        </Badge>
        {/* <Select>
                    <SelectTrigger className="w-[130px] text-white">
                        <SelectValue placeholder="Endorsing" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="test" className="flex">
                            <div className="flex gap-2">
                                <Image alt={"postImage"} width={20} height={20} src="/apeLogo.webp" className="" />
                                <p>20 APE</p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select> */}
      </div>
    </div>
  );
}

export default PostComponent;
