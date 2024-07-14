export const shuffleTags = () => {
    let tags = TAGS.slice();
    for (let i = tags.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tags[i], tags[j]] = [tags[j], tags[i]];
    }
    return tags;
}

export const TAGS = [
    {
        name: "Apecoin",
        tag: "apecoin",
        description: "You own Apecoin.",
        image: "https://research.binance.com/static/images/projects/apecoin/logo.png"
    },
    {
        name: 'POAP ETH London',
        tag: 'poap-eth-london',
        description: 'You attended EthGlobal London.',
        image: "https://assets.poap.xyz/4903e4a8-64c0-470f-8873-2cf49ec6482f.png"
    },
    {
        name: "Artist",
        tag: "artist",
        description: "You created your own collection with more than 1 ETH in volume.",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrUJYpcs_FFt1tZNeCngdywx2OLcQAygbiPNLXj1p10pWCFe5EPlJlLK9U8zUWiIqpRCKZbCvWfEs8NA21xDc1STD9M8y7sZN44IRW5A"
    },
    {
        name: "DeFi Trader",
        tag: "defi-trader",
        description: "You traded more than 1 ETH in DeFi.",
        image: "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/DLJW7BAKPFEG3HCSNWPYV4QBWQ.png"
    },
    {
        name: "Lens User",
        category: "lens",
        description: "You own a Lens Profile.",
        image: "https://img.cryptorank.io/coins/lens_protocol1667554440648.png"
    },
    {
        name: "Farcaster",
        code: "farcaster",
        description: "You own a Farcaster Profile.",
        image: "https://chainbroker.io/_next/image/?url=https%3A%2F%2Fstatic.chainbroker.io%2Fmediafiles%2Fprojects%2Ffarcaster%2Ffarcaster.jpeg&w=2560&q=75"
    },
    {
        name: "Blast User",
        code: "blast",
        description: "You made more than 20 transactions on Blast.",
        image: "https://cdn.prod.website-files.com/614c99cf4f23700c8aa3752a/66425fa482bce3bc3cb20b41_blast_blockchain_logo.jpeg",
    },
    {
        name: "The Graph User",
        code: "the-graph",
        description: "You deposited GRT on the Graph.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Logo_of_The_Graph.jpg"
    },
]