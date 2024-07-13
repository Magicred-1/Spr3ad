import { Post, dataBy } from "@/types/Post";
import Image from "next/image";
import TinderCard from "react-tinder-card";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { getImageForUser, getNameForUser } from "../utils/getUserData";
import { BlockscoutTx } from "./BlockscoutTx";
import { User } from "@/types/User";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TAGS } from "../utils/tags";
import Select, { MultiValue } from "react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import FileInput from "../FileInput";
import lighthouse from "@lighthouse-web3/sdk";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { usePublicClient, useWriteContract } from "wagmi";
import { galadrielABI, getContract, spreadABI, testABI } from "@/lib/utils";

interface NewPostProps { }

export const NewPost: React.FC<NewPostProps> = () => {
    const [tags, setTags] = useState(dataBy.general.tags);
    const [useGaladriel, setUseGaladriel] = useState(true);
    const [files, setFiles] = useState<File[]>([]);
    const [ipfsHashes, setIpfsHashes] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const { writeContract } = useWriteContract();
    const publicClient = usePublicClient();
    const [user, setUser] = useState<User>({
        id: "1",
        name: "user1",
        ens: "user1.eth",
        address: "0x123",
    });
    const userName = getNameForUser(user);
    const userImage = getImageForUser(user);

    const options = TAGS.map((tag) => {
        return {
            value: tag.name,
            label: tag.name,
        };
    });

    const sendPost = async () => {
        const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_KEY;
        if (!API_KEY) {
            throw new Error("API Key not found");
        }

        const postObj = {
            step: "newPost",
            text,
            images: ipfsHashes,
            selectedTags,
            useGaladriel,
        };

        const response = await lighthouse.uploadText(
            JSON.stringify(postObj),
            API_KEY
        );

        const id = await publicClient?.getChainId()!;
        const galaAddress = getContract("galadriel", id);
        const testAddress = getContract("test", id);
        if (id === 696969) {
            writeContract({
                abi: galadrielABI,
                address: galaAddress,
                functionName: "sendMessage",
                args: [text, tags],
            });
        }
        console.log(response.data.Hash, text);
        writeContract({
            abi: testABI,
            address: testAddress,
            functionName: "postCard",
            args: [response.data.Hash, text],
        });

        console.log("🚀 ~ sendPost ~ response:", response);
        console.log(postObj);
        console.log(
            "Visit at https://gateway.lighthouse.storage/ipfs/" + response.data.Hash
        );
    };

    const updateTags = (
        values: MultiValue<{
            value: string;
            label: string;
        }>
    ) => {
        const newTags = values.map((value) => value.value);
        setSelectedTags(newTags);
    };

    return (
        <div className="top-0 bg-blue-950 w-full h-[34rem] rounded-xl shadow-xl py-4 px-2">
            <div className="relative flex flex-col items-center justify-evenly h-full">
                {/* <div className="flex items-center bg-blur gap-x-2">
                    <Image alt={userName} src={userImage} width={200} height={200} className="rounded-full w-10 h-10" />
                    <p>
                        {userName}
                    </p>
                </div> */}
                <div className="relative w-full h-48 rounded-xl border-white border-2 flex justify-center items-center flex-col">
                    <Carousel className="w-full h-full">
                        <CarouselContent className="w-full h-full">
                            {files.map((file, index) => (
                                <CarouselItem key={index} className="w-full h-full">
                                    <Image
                                        style={{
                                            objectFit: "contain",
                                        }}
                                        alt="userImage"
                                        src={URL.createObjectURL(file)}
                                        fill={true}
                                        className="rounded-xl w-10 h-10"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    {files.length < 1 && <p className="text-white absolute">Add Image</p>}
                    <div className="absolute right-0 bottom-0">
                        <FileInput setFiles={setFiles} setIpfsHashes={setIpfsHashes} />
                    </div>
                </div>
                <div className="flex gap-2 p-2"></div>
                <div className="w-full flex flex-col">
                    <Input className="text-white" placeholder="Title" />
                </div>
                <div className="w-full flex flex-col">
                    <Select
                        onChange={(newValues) => {
                            updateTags(newValues);
                        }}
                        placeholder={"Select tags"}
                        isMulti
                        className="w-full text-xs "
                        styles={{
                            control: (state) => ({ ...state, backgroundColor: "black" }),
                            option: (state) => ({
                                ...state,
                                backgroundColor: "black",
                                color: "white",
                            }),
                        }}
                        options={options}
                    />

                    <Textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        className="bg-black text-white w-full h-24 p-2 my-2 focus:outline-none focus:ring-0"
                        placeholder="Add text"
                    />
                    <div className="flex w-full backdrop:flex items-center space-x-2 px-2 mt-2">
                        <Checkbox
                            className="text-white border-white"
                            onCheckedChange={(e) => {
                                setUseGaladriel(e as boolean);
                            }}
                            onChange={(e) => {
                                console.log(e.target);
                            }}
                            id="terms"
                        />
                        <label
                            htmlFor="terms"
                            className="text-white text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Generate AI tags with Galadriel
                        </label>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        sendPost();
                    }}
                    className="w-1/2"
                >
                    Post
                </Button>
            </div>
        </div>
    );
};
