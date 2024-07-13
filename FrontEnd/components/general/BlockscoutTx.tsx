import Image from "next/image"
import Link from "next/link"

// https://docs.blockscout.com/about/projects
const getBlockscoutBaseURL = (chainId: number) => {
    switch (chainId) {
        case 1:
            return "https://eth.blockscout.com"
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
                className="flex items-center justify-center gap-x-1 pressable card-link text-black text-xs rounded-md border border-black px-2 py-1"
            >
                 
                <p>Open in Blockscout</p>
                <Image src="/blockscout.jpg" alt="Blockscout" width={20} height={20} className="w-5 h-5 rounded-full" />
            </Link>

    )
}