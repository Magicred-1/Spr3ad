import {
  DynamicMultiWalletPromptsWidget,
  useDynamicModals,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { Button } from "./ui/button";
import { TAGS, shuffleTags } from "./utils/tags";
import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { usePublicClient, useWriteContract } from "wagmi";
import { getContract, spreadABI, user_tags } from "@/lib/utils";
import { Badge } from "./ui/badge";
import WorldcoinButton from "./WorldcoinButton";

function Onboarding({ refresh }: { refresh: Function }) {
  const [tags, setTags] = useState(user_tags);
  const [userTags, setUserTags] = useState<
    {
      name: string;
      description: string;
      image: string;
    }[]
  >([]);
  const { setShowLinkNewWalletModal } = useDynamicModals();
  const userWallets = useUserWallets();
  const [lastSeenWallets, setLastSeenWallets] = useState<string[]>([]);
  const publicClient = usePublicClient();
  const { writeContract } = useWriteContract();

  const isThereNewWallets = () => {
    return userWallets.some(
      (wallet) => !lastSeenWallets.includes(wallet.address)
    );
  };

  const setupUser = async () => {
    const id = await publicClient?.getChainId()!;
    const contractAddress = getContract("spread", id);

    writeContract({
      abi: spreadABI,
      address: contractAddress,
      functionName: "setupUser",
      args: [userTags],
    });
  };

  const getIfApeCoinHolder = async (address: string) => {
    try {
      const response = await fetch(
        "https://gateway.thegraph.com/api/deployments/id/Qmd55TD7tQYdKJSb9hFhGkPZdBeXNzRe1nR89jpj98aU2m",
        {
          headers: {
            accept: "application/json, multipart/mixed",
            "accept-language": "en-US,en;q=0.9",
            authorization: "Bearer 944b560e76f53abf0739468966998887",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            Referer: "https://thegraph.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body:
            '{"query":"{\\n  holders(where:{address:\\"' +
            address +
            '\\"}) {\\n    id\\n    address\\n    balance\\n    token {\\n      id\\n    }\\n  }\\n}"}',
          method: "POST",
        }
      );

      const data = await response.json();

      return parseFloat(data.data.holders[0].balance) > 0 || false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getUserTags = () => {
    if (!isThereNewWallets()) {
      return;
    }
    setLastSeenWallets(userWallets.map((wallet) => wallet.address));
    const shuffledTags = shuffleTags();
    const tagsPerWallet = 2;
    const newTags = [];

    for (let i = 0; i < userWallets.length; i++) {
      for (let j = 0; j < tagsPerWallet; j++) {
        const tagIndex = (i * tagsPerWallet + j) % shuffledTags.length;
        newTags.push(shuffledTags[tagIndex]);
      }
    }

    const combinedTags = [...userTags, ...newTags];
    getIfApeCoinHolder(userWallets[0].address);
    const uniqueTags = Array.from(new Set(combinedTags.map((tag) => tag.name)))
      .map((name) => combinedTags.find((tag) => tag.name === name))
      .filter(
        (tag): tag is { name: string; description: string; image: string } =>
          tag !== undefined
      );

    setUserTags(uniqueTags);
  };

  useEffect(() => {
    getUserTags();
  }, [userWallets]);

  const setup = async () => {
    await setupUser();
    refresh(true);
  };

  return (
    <div className="mx-auto text-center flex flex-col gap-10 text-white bg-black/80">
      {/* <Spline
        scene="https://prod.spline.design/GzQFnTdbQCeOpknA/scene.splinecode"
        className="absolute inset-0 w-[50px]"
      /> */}
      <h1 className="text-3xl font-bold">Get Started</h1>
      <div className="link-wallet-container">
        <WorldcoinButton />
        <Button
          className="profile-button"
          variant={"secondary"}
          onClick={() => setShowLinkNewWalletModal(true)}
        >
          Link New Wallet
        </Button>
      </div>
      <Button
        className="w-64 mx-auto"
        onClick={setup}
        disabled={userWallets.length === 0}
      >
        Enter Spread
      </Button>
      {userTags.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-3">
            We Found {userTags.length + tags.length} Tags for You
          </h2>
          <ul className="flex gap-5 w-10/12 justify-center mx-auto flex-wrap">
            {userTags.map((tag) => (
              <li
                key={tag.name}
                className="flex flex-col justify-between items-center w-32 bg-purple-500/5 p-3 rounded-xl"
              >
                <img
                  src={tag.image}
                  alt={tag.name}
                  className="w-10 rounded-full"
                />
                <p className="font-bold text-sm">{tag.name}</p>
                <p className="text-xs">{tag.description}</p>
              </li>
            ))}
          </ul>
          <p>Other Tags</p>
          {tags.map((tag, index) => (
            <Badge variant={"secondary"} key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {userWallets.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold">Wallets</h2>
          <ul className="">
            {userWallets.map((wallet) => (
              <li key={wallet.id}>
                <p>{wallet.address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <DynamicMultiWalletPromptsWidget />
    </div>
  );
}

export default Onboarding;
