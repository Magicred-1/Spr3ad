import Image from "next/image"
import Link from "next/link"

// https://docs.blockscout.com/about/projects
const getBlockscoutBaseURL = (chainId: number) => {
    switch (chainId) {
        case 1: // eth
            return "https://eth.blockscout.com"
        case 696969://galadriel
         return 'https://explorer.galadriel.com'
         case 421614: // arbi sepolia
         return 'https://sepolia-explorer.arbitrum.io'
         case 534351: // scroll sepolia
         return 'https://sepolia.scrollscan.com'
         case 84532: // base sepolia
         return 'https://base-sepolia.blockscout.com'
         
    }
}

interface BlockscoutTxProps {
    chainId: number
    txHash: string
}

export const BlockscoutTx: React.FC<BlockscoutTxProps> = ({ txHash, chainId }) => {
    return (
    
            <Link
                href={`${getBlockscoutBaseURL(chainId)}/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-x-1 pressable card-link bg-white text-xs rounded-md border text-blue-950 px-2 py-1"
            >
                 
                <p>Open in Blockscout</p>
                <Image src="/blockscout.jpg" alt="Blockscout" width={20} height={20} className="w-5 h-5 rounded-full" />
            </Link>

    )
}