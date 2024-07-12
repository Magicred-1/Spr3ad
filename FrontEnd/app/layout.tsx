"use client";

import "./globals.css";
import { lexend } from "@/components/utils/const"
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import {
  createConfig,
  WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    // <DynamicContextProvider
    //   settings={{
    //     environmentId: 'ef3ba85a-0b46-4b8c-aec7-562794bc9fc0',
    //     walletConnectors: [EthereumWalletConnectors],
    //   }}>

    //       <DynamicWidget />

    // </DynamicContextProvider>
    <html lang="en">
      <DynamicContextProvider
        settings={{
          // Find your environment id at https://app.dynamic.xyz/dashboard/developer
          environmentId: "ef3ba85a-0b46-4b8c-aec7-562794bc9fc0",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <body className={`overflow-hidden w-full h-screen ${lexend.className}`}>
                {children}
              </body>
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>

    </html>


  );
}




