import { User } from "./User";

export interface Post {
    title: string;
    description: string;
    mediaUrl?: string;
    tags: string[];
    user: User;
    txHash?: string;
    chainId?: number;
}

export const mockedPosts: Post[] = [
    {
        title: "Post 1",
        description: "Hey anon, this is a post from user1, I hope you like it! :)",
       // mediaUrl: "https://via.placeholder.com/150",
        tags: ["tag1", "tag2"],
        user: {
            id: "1",
            name: "user1",
            img: "https://via.placeholder.com/150",
            ens: "user1.eth",
            address: "0x123"
        },
        txHash: "0x123",
        chainId: 1,
    },
    {
        title: "Post 2",
        description: "Description 2",
        mediaUrl: "https://via.placeholder.com/150",
        tags: ["tag1", "tag2"],
        user: {
            id: "1",
            name: "user1",
            img: "https://via.placeholder.com/150",
            ens: "user1.eth",
            address: "0x123"
        },
        txHash: "0x123",
        chainId: 1,
    },
    {
        title: "Post 3",
        description: "Description 3",
        //mediaUrl: "https://via.placeholder.com/150",
        tags: ["tag1", "tag2"],
        user: {
            id: "1",
            name: "user1",
            img: "https://via.placeholder.com/150",
            ens: "user1.eth",
            address: "0x123"
        },
        txHash: "0x123",
        chainId: 1,
    },
];