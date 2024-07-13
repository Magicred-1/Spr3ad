import {
  DynamicMultiWalletPromptsWidget,
  useDynamicModals,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { Button } from "./ui/button";
import { TAGS, shuffleTags } from "./utils/tags";
import { useEffect, useState } from "react";

function Onboarding() {
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

  const isThereNewWallets = () => {
    return userWallets.some(
      (wallet) => !lastSeenWallets.includes(wallet.address)
    );
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

  const setup = () => {
    //TODO
  };

  return (
    <div className="mx-auto text-center flex flex-col gap-10">
      <h1 className="text-3xl font-bold">Get Started</h1>
      <div className="link-wallet-container">
        <Button
          className="profile-button"
          variant={"secondary"}
          onClick={() => setShowLinkNewWalletModal(true)}
        >
          Link New Wallet
        </Button>
      </div>
      <Button className="w-64 mx-auto" onClick={setup}>
        Enter Spread
      </Button>
      {userTags.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-3">
            We Found {userTags.length} Tags for You
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
