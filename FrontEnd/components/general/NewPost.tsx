import { Post } from "@/types/Post"
import Image from "next/image"
import TinderCard from 'react-tinder-card'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { getImageForUser, getNameForUser } from "../utils/getUserData"
import { BlockscoutTx } from "./BlockscoutTx"
import { User } from "@/types/User"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { TAGS } from "../utils/tags"
import Select, { MultiValue } from 'react-select'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "../ui/button"
import FileInput from "../FileInput"
import lighthouse from '@lighthouse-web3/sdk'


interface NewPostProps {
}

export const NewPost: React.FC<NewPostProps> = () => {
    const [useGaladriel, setUseGaladriel] = useState(true)
    const [files, setFiles] = useState<File[]>([])
    const [ipfsHashes, setIpfsHashes] = useState<string[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [image, setImage] = useState<string | null>(null)
    const [text, setText] = useState<string>("")
    const [user, setUser] = useState<User>({
        id: "1",
        name: "user1",
        ens: "user1.eth",
        address: "0x123"
    })
    const userName = getNameForUser(user)
    const userImage = getImageForUser(user)

    const options = TAGS.map(tag => {
        return {
            value: tag.name,
            label: tag.name
        }
    }
    )

    const sendPost = async () => {
        const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_KEY
        if (!API_KEY) {
            throw new Error('API Key not found')
        }

        const postObj = {
            step: 'newPost',
            text,
            images: ipfsHashes,
            selectedTags,
            useGaladriel
        }

        const response = await lighthouse.uploadText(JSON.stringify(postObj), API_KEY)
        console.log("🚀 ~ sendPost ~ response:", response)
        console.log(postObj)
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + response.data.Hash)
    }


    const updateTags = (values: MultiValue<{
        value: string;
        label: string;
    }>) => {
        const newTags = values.map(value => value.value)
        setSelectedTags(newTags)
    }

    return (
        <div
            className="top-0 bg-gray-200 w-full h-[34rem] rounded-xl shadow-xl py-4 px-2"
        >

            <div className="relative flex flex-col items-center justify-evenly h-full">
                <div className="flex items-center bg-blur gap-x-2">
                    <Image alt={userName} src={userImage} width={200} height={200} className="rounded-full w-10 h-10" />
                    <p>
                        {userName}
                    </p>
                </div>
                <div className="w-full h-48 rounded-xl flex justify-center items-center flex-col">
                    {/* { // display image when available
                        image
                            ? (
                                <Image className="rounded-xl w-full h-48 object-cover" alt={post.description} src={post.mediaUrl} width={300} height={300} />
                            ) : (
                                <p className="text-center">
                                    {post.description}
                                </p>
                            )
                    } */}
                    <p>Add Image</p>
                    <FileInput setFiles={setFiles} setIpfsHashes={setIpfsHashes} />
                </div>
                <div className="flex gap-2 p-2">
                    {files.map((file, index) => (
                        <Image key={index} style={{
                            objectFit: 'cover'
                        }}
                            alt="userImage"
                            src={URL.createObjectURL(file)}
                            width={200}
                            height={200}
                            className="rounded-xl w-10 h-10" />
                    ))
                    }
                </div>
                <div className="w-full flex flex-col">
                    <Select
                        onChange={(newValues) => {
                            updateTags(newValues)
                        }}
                        placeholder={"Select tags"} isMulti className="w-full text-xs" options={options} />
                    <div className="flex w-full backdrop:flex items-center space-x-2 px-2 mt-2">
                        <Checkbox
                            onCheckedChange={(e) => {
                                setUseGaladriel(e as boolean)
                            }}
                            onChange={(e) => {
                                console.log(e.target)
                            }}
                            id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Generate AI tags with Galadriel
                        </label>
                    </div>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        className="w-full h-24 rounded-xl p-2 my-2 focus:outline-none focus:ring-0" placeholder="Add text" />
                </div>
                <Button
                    onClick={() => {
                        sendPost()
                    }}
                    className="w-1/2">Post</Button>
            </div>
        </div>
    )
}