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
        <div className="text-white rounded-md border border-white px-2 py-1">
            <Link
                href={`${getBlockscoutBaseURL(chainId)}/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className=""
            >
                Open in Blockscout
            </Link>
        </div>
    )
}