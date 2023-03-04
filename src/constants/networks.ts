export const NETWORKS = [
    {
        chainId: "0x1",
        chainName: "Ethereum",
        rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/zRATcsYCBGw2PQwazpOUS9gxmpKY45dT",
        explorer: "https://etherscan.io",
        enabled: false,
    },
    {
        chainId: "0x5",
        chainName: "Goerli",
        rpcUrl: "https://eth-goerli.g.alchemy.com/v2/iwlvwZ7b7rp3ZnPzHdCnsV5NmcCNpZYM",
        explorer: "https://goerli.etherscan.io",
        enabled: true,
    },
    {
        chainId: "0x89",
        chainName: "Polygon",
        rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/zX8wopjFQjq1S_RQf3RuZuzz7Y7ozlTK",
        explorer: "https://polygonscan.com",
        enabled: false,
    },
    {
        chainId: "0x7a69",
        chainName: "Localhost",
        rpcUrl: "http://127.0.0.1:4585",
        explorer: "https://goerli.etherscan.io",
        enabled: false,
    },
]

export const SUPPORTED_NETWORKS = ["0x5"]

export const NO_NETWORK = "-----"
