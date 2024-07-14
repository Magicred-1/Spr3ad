"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chain, http } from "viem";
import {
  mainnet,
  arbitrumSepolia,
  baseSepolia,
  scrollSepolia,
  morphHolesky,
  rootstockTestnet,
  neonDevnet,
  zircuitTestnet,
} from "viem/chains";
import { mergeNetworks } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const galadriel = {
  id: 696969,
  name: "Galadriel",
  nativeCurrency: { name: "Galadriel", symbol: "GAL", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet.galadriel.com"] },
  },
  blockExplorers: {
    default: {
      name: "Galadriel Explorer",
      url: "https://explorer.galadriel.com",
    },
  },
} as const satisfies Chain;

export const config = createConfig({
  chains: [
    mainnet,
    galadriel,
    arbitrumSepolia,
    baseSepolia,
    scrollSepolia,
    morphHolesky,
    rootstockTestnet,
    neonDevnet,
    zircuitTestnet,
  ],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [galadriel.id]: http(),
    [arbitrumSepolia.id]: http(),
    [baseSepolia.id]: http(),
    [scrollSepolia.id]: http(),
    [morphHolesky.id]: http(),
    [rootstockTestnet.id]: http(),
    [neonDevnet.id]: http(),
    [zircuitTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export const customEVMChains = [
  {
    blockExplorerUrls: ["https://explorer.galadriel.com"],
    chainId: 696969,
    chainName: "Galadriel Devnet",
    iconUrls: [
      "https://framerusercontent.com/images/cm2XdkhbP9YP9hqP2vt72ByxUI.png",
    ],
    name: "Galadriel",
    nativeCurrency: {
      decimals: 18,
      name: "Galadriel",
      symbol: "GAL",
    },
    networkId: 696969,
    rpcUrls: ["https://devnet.galadriel.com"],
    vanityName: "Galadriel Devnet",
  },
  {
    blockExplorerUrls: ["https://explorer.zero.network"],
    chainId: 4457845,
    chainName: "ZERϴ Network",
    iconUrls: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPMDlry5SuZn_DufynOlgepbQr5uUYlsRweA&s",
    ],
    name: "ZERϴ Network",
    nativeCurrency: {
      decimals: 18,
      name: "ZERϴ",
      symbol: "ETH",
    },
    networkId: 4457845,
    rpcUrls: ["https://rpc.zerion.io/v1/zero-sepolia"],
    vanityName: "ZERϴ Network",
  }
];

const DynamicWagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "ef3ba85a-0b46-4b8c-aec7-562794bc9fc0",
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: (networks) => mergeNetworks(customEVMChains, networks),
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};

export default DynamicWagmiProvider;
