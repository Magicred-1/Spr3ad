import { User } from "./User";

export interface Post {
    title?: string;
    description: string;
    mediaUrl?: string;
    tags: string[];
    user: User;
    txHash?: string;
    chainId?: number;
    views?: number;
    endorses?: number;
    isSponsored?: boolean;
    sponsoredToken?: string;
    tokenAddress?: `0x${string}`;
}

export const mockedPosts: Post[] = [
    {
        title: "Post 1",
        description: "Hey anon, this is a post from user1, I hope you like it! :)",
        tags: ["tag1", "tag2"],
        user: {
            id: "1",
            name: "user1",
            ens: "user1.eth",
            address: "0x123",
        },
        txHash: "0x123",
        chainId: 1,
        tokenAddress: "0x06daeD3902Cac6C56B6906F150A54882A07Ebe10"
    },
    {
        title: "Post 2",
        description: "Hey anon, this is a post from user1, I hope you like it! :)",
        mediaUrl: "https://via.placeholder.com/150",
        tags: ["tag1", "tag2"],
        user: {
            id: "1",
            name: "user1",
            ens: "user1.eth",
            address: "0x123",
        },
        txHash: "0x123",
        chainId: 1,
    },
    {
        title: "Post 3",
        description: "Description 3",
        tags: ["tag1", "tag2"],
        user: {
            id: "1",
            name: "user1",
            ens: "user1.eth",
            address: "0x123",
        },
        txHash: "0x123",
        chainId: 1,
    },
];
export interface data {
    tags: string[];
    posts: Post[]
}

const getGeneratedUser = (number: number) => {
    const randomNames = ["N0rooo", "10gust10", "Juents"]
    return {
        id: "1",
        name: randomNames[number],
        ens: "user1.eth",
        address: "0x123",
    }
}

const ApeCoinUser: User = {
    id: "1",
    name: "ApeCoin",
    ens: "user1.eth",
    address: "0x123",
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/18876.png",
}

const ScrollUser: User = {
    id: "1",
    name: "Scroll",
    ens: "user1.eth",
    address: "0x123",
    img: "https://img.cryptorank.io/coins/scroll1693474620599.png",
}

const BaseUser: User = {
    id: "1",
    name: "Base",
    ens: "user1.eth",
    address: "0x123",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLD4nw-rVHS3S91_rxVS-M2egS1yRkncPJDA&s",
}

const ArbitrumUser: User = {
    id: "1",
    name: "Arbitrum",
    ens: "user1.eth",
    address: "0x123",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyflpuaM1GZXcYzmBlcqnOmJilMMq34-4mVw&s",
}

const ZerionUser: User = {
    id: "1",
    name: "Zerion",
    ens: "user1.eth",
    address: "0x123",
    img: "https://www.cryptotimes.io/wp-content/uploads/2024/03/6568840f9547ecd55a9f5c9c_Homepage_thumbnail-min-scaled.jpg",
}

const BlastUser: User = {
    id: "1",
    name: "Blast",
    ens: "user1.eth",
    address: "0x123",
    img: "https://pbs.twimg.com/profile_images/1805963937449381888/aNF8BIJo_400x400.jpg",
}

export const dataBy = {
    apecoin: {
        tags: ["ApeCoin Holder", "BoredApe Holder", "Layer2 user", "NFT Enthusiast", "Metaverse Explorer", "DAO Member", "DeFi Participant", "Web3 Developer", "Crypto Trader", "Token Staker"],
        posts: [
            {
                "description": "Join the Ape Layer 2 now ! Exclusive incentives for ApeCoin holders. Don't miss out!",
                "mediaUrl": "https://public.bnbstatic.com/static/academy/uploads-original/e639b36e71de47a6abfaa35a249a393f.png",
                "tags": ["ApeCoin Holder", "DAO Member", "NFT Enthusiast"],
                "isSponsored": true,
                user: ApeCoinUser,
                sponsoredToken: "APE",
                tokenAddress: "0x06daeD3902Cac6C56B6906F150A54882A07Ebe10"
            },
            {
                "description": "Did you know? ApeCoin holders get exclusive access to upcoming Bored Ape Yacht Club events. Don't miss out!",
                "mediaUrl": "",
                "tags": ["ApeCoin Holder", "BoredApe Holder", "Metaverse Explorer"],
                "isSponsored": false,
                user: getGeneratedUser(1)
            },
            {
                "description": "Here's a sneak peek of the new Bored Ape Yacht Club merchandise dropping soon.",
                "mediaUrl": "https://i.gadgets360cdn.com/large/Bored_ape_yacht_club_merch_twitter_large_1648534318935.jpg",
                "tags": ["BoredApe Holder", "NFT Enthusiast", "Crypto Trader"],
                "isSponsored": false,
                user: getGeneratedUser(2)
            }
        ]
    },
    "base": {
        "tags": ["Layer2 user", "Base Protocol", "Scalability Enthusiast", "DeFi Participant", "Web3 Developer", "Crypto Trader", "Ethereum User", "Gas Fee Saver", "Smart Contract Developer", "Blockchain Innovator"],
        "posts": [
            {
                "description": "Discover the power of Base Protocol. Scale your dApps with our secure and efficient Layer2 solution.",
                "mediaUrl": "",
                "tags": ["Base Protocol", "Layer2 user", "Scalability Enthusiast"],
                "isSponsored": true,
                user: BaseUser,
                sponsoredToken: "USDC",
                tokenAddress: "0xd7b42907D430D1C073413976CD12E205edcA0efB"
            },
            {
                "description": "Base Protocol offers one of the lowest gas fees in the market. Optimize your transactions today!",
                "mediaUrl": "",
                "tags": ["Gas Fee Saver", "Layer2 user", "Ethereum User"],
                "isSponsored": false,
                user: getGeneratedUser(1)
            },
            {
                "description": "Our latest upgrade significantly boosts transaction speeds. Check out the performance comparison chart.",
                "mediaUrl": "https://img.jinse.cn/7194442_watermarknone.png",
                "tags": ["Base Protocol", "Scalability Enthusiast", "Blockchain Innovator"],
                "isSponsored": false,
                user: getGeneratedUser(2)
            }
        ]
    },

    "arbitrum": {
        "tags": ["Arbitrum User", "Layer2 user", "DeFi Participant", "Web3 Developer", "Ethereum User", "Crypto Trader", "Gas Fee Saver", "Scalability Enthusiast", "Smart Contract Developer", "Blockchain Innovator"],
        "posts": [
            {
                "description": "Scale your dApps effortlessly with Arbitrum's advanced Layer2 solutions. Join us and revolutionize your blockchain experience.",
                "mediaUrl": "",
                "tags": ["Arbitrum User", "Layer2 user", "Scalability Enthusiast"],
                "isSponsored": true,
                user: ArbitrumUser,
                sponsoredToken: "USDC"
            },
            {
                "description": "Arbitrum's latest update reduces gas fees by 50%. Experience cost-effective transactions like never before!",
                "mediaUrl": "",
                "tags": ["Gas Fee Saver", "Arbitrum User", "Ethereum User"],
                "isSponsored": false,
                user: getGeneratedUser(1)
            },
            {
                "description": "Explore the new developer tools released by Arbitrum to enhance your smart contract deployment.",
                "mediaUrl": "https://opengraph.githubassets.com/5c3cf38963c91fec9bec768664b2a7566af0d8e71ec01e607857e3f1dcd33d25/OffchainLabs/arbitrum-orbit-deployment-ui",
                "tags": ["Web3 Developer", "Smart Contract Developer", "Arbitrum User"],
                "isSponsored": false,
                user: getGeneratedUser(2)
            }
        ]
    },
    "ens": {
        "tags": ["ENS User", "Ethereum User", "Web3 Developer", "Domain Name Enthusiast", "Crypto Trader", "DeFi Participant", "NFT Enthusiast", "Blockchain Innovator", "Smart Contract Developer", "Crypto Investor"],
        "posts": [
            {
                "description": "Secure your unique Ethereum Name Service (ENS) domain today. Simplify your blockchain identity with ENS!",
                "mediaUrl": "",
                "tags": ["ENS User", "Ethereum User", "Domain Name Enthusiast"],
                "isSponsored": true,
                user: getGeneratedUser(0),
                sponsoredToken: "USDC"
            },
            {
                "description": "Did you know? ENS domains can now be integrated with major DeFi platforms for seamless transactions.",
                "mediaUrl": "",
                "tags": ["DeFi Participant", "ENS User", "Crypto Trader"],
                "isSponsored": false,
                user: getGeneratedUser(1)
            },
            {
                "description": "Check out the latest ENS-supported dApps that enhance your Web3 experience.",
                "mediaUrl": "List of popular ENS-supported dApps with their logos",
                "tags": ["ENS User", "Web3 Developer", "Blockchain Innovator"],
                "isSponsored": false,
                user: getGeneratedUser(2)
            }
        ]
    },
    "zerion": {
        "tags": ["Zerion User", "DeFi Participant", "Crypto Trader", "Portfolio Manager", "Ethereum User", "Token Staker", "Web3 Developer", "NFT Enthusiast", "Blockchain Innovator", "Yield Farmer"],
        "posts": [
            {
                "description": "Manage your DeFi portfolio effortlessly with Zerion. Track and trade all your assets in one place.",
                "mediaUrl": "",
                "tags": ["Zerion User", "DeFi Participant", "Portfolio Manager"],
                "isSponsored": true,
                user: ZerionUser,
                sponsoredToken: "USDC"
            },
            {
                "description": "Zerion now supports staking on multiple DeFi platforms. Maximize your returns with ease!",
                "mediaUrl": "",
                "tags": ["Token Staker", "Zerion User", "Yield Farmer"],
                "isSponsored": false,
                user: getGeneratedUser(1)
            },
            {
                "description": "Explore Zerion's new NFT management tools, making it easier than ever to track and trade your digital collectibles.",
                "mediaUrl": "https://zerion.io/blog/content/images/size/w1200/2022/05/photo_2022-05-26-15.26.14.jpeg",
                "tags": ["NFT Enthusiast", "Zerion User", "Crypto Trader"],
                "isSponsored": false,
                user: getGeneratedUser(2)
            }
        ]
    },
    "scroll": {
        "tags": ["Scroll User", "Layer2 user", "DeFi Participant", "Web3 Developer", "Crypto Trader", "Ethereum User", "Gas Fee Saver", "Scalability Enthusiast", "Smart Contract Developer", "Blockchain Innovator"],
        "posts": [
            {
                "description": "Scroll's loyalty program kicks off with Session Zero. Obtain Marks by bridging assets to Scroll.",
                "mediaUrl": "https://pbs.twimg.com/card_img/1811027382771286016/nQyWCTBR?format=jpg&name=medium",
                "tags": ["Scroll User", "Layer2 user", "Scalability Enthusiast"],
                "isSponsored": true,
                user: ScrollUser,
                sponsoredToken: "USDC"
            },
            {
                "description": "Scroll's new update offers enhanced security features for all users. Stay protected and transact with confidence.",
                "mediaUrl": "",
                "tags": ["Scroll User", "DeFi Participant", "Ethereum User"],
                "isSponsored": false,
                user: getGeneratedUser(1)
            },
            {
                "description": "Check out the latest tutorial on deploying smart contracts on Scroll's Layer2 network.",
                "mediaUrl": "https://blog.thirdweb.com/content/images/2023/04/Deploy-a-Smart-Contract-on-Scroll-zkEVM.png",
                "tags": ["Web3 Developer", "Smart Contract Developer", "Scroll User"],
                "isSponsored": false,
                user: getGeneratedUser(2)
            }
        ]
    },
    "general": {
        "tags": ["DeFi Enthusiast", "Layer2 User", "NFT Collector", "Crypto Trader", "Blockchain Developer", "Web3 Innovator", "DAO Member", "Token Holder", "Yield Farmer", "Metaverse Explorer", "Crypto Investor"],
        "posts": [
            // Galadriel Only
            {
                "description": "Blast Phase 2 now begins: Enter the Fullstack Chain",
                "mediaUrl": "https://pbs.twimg.com/media/GRATaWnbIAA-Ic3?format=jpg&name=4096x4096",
                "tags": ["DeFi Enthusiast", "Layer2 User", "Yield Farmer"],
                "isSponsored": true,
                user: BlastUser,
                sponsoredToken: "USDC",
                tokenAddress: "0xd7b42907D430D1C073413976CD12E205edcA0efB"
            },
            {
                "description": "NFTs are changing the digital art world. Learn how to mint, trade, and collect your own non-fungible tokens.",
                "mediaUrl": "",
                "tags": ["NFT Collector", "Crypto Trader", "Blockchain Developer"],
                "isSponsored": false,
                user: getGeneratedUser(1)
            },
            {
                "description": "Explore the exciting world of virtual reality in the metaverse. Here’s a sneak peek at the latest VR platforms.",
                "mediaUrl": "https://image.cnbcfm.com/api/v1/image/106599880-1593619276759spatial1.png?v=1593619426",
                "tags": ["Metaverse Explorer", "Web3 Innovator", "Crypto Investor"],
                "isSponsored": false,
                user: getGeneratedUser(2)
            }
        ]
    }


}