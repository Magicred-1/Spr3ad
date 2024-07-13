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

  const getUserTags = async () => {
    const nbTags = TAGS.length;
    const tags = shuffleTags();
    const tagsOfUser = [];
    const nbUserTags = Math.floor(Math.random() * nbTags) + 1;
    for (let i = 0; i < nbUserTags; i++) {
      tagsOfUser.push(tags[i]);
    }

    setUserTags(tagsOfUser);
  };

  useEffect(() => {
    getUserTags();
  }, []);

  return (
    <div className="mx-auto text-center flex flex-col gap-10">
      <h1 className="text-3xl font-bold">Onboarding</h1>
      <div className="link-wallet-container">
        <Button
          className="profile-button"
          onClick={() => setShowLinkNewWalletModal(true)}
        >
          Link New Wallet
        </Button>
      </div>
      {userTags.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-3">
            We Found {userTags.length} Tags for You
          </h2>
          <ul className="flex gap-5 w-10/12 justify-center mx-auto">
            {userTags.map((tag) => (
              <li
                key={tag.name}
                className="flex flex-col justify-between items-center  bg-purple-500/5 p-3 rounded-xl"
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

      <Button>Enter Spread</Button>

      <DynamicMultiWalletPromptsWidget />
    </div>
  );
}

export default Onboarding;
