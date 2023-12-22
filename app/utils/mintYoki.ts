import { ethers } from 'ethers';

const YOKI_CONTRACT_ADDRESS = "0x4e14510c4DCEB04567CA5752C953c49D13254fe7";
const YOKI_TOKEN_ID = 2;
const address = "Address_To_Mint_To_Here";

const abi = [
    {
      name: "mint",
      inputs: [
        { name: "account", type: "address" },
        { name: "id", type: "uint256" },
        { name: "amount", type: "uint256" },
        { name: "", type: "bytes" },
      ],
      stateMutability: "nonpayable",
      type: "function",
      outputs: [],
    },
];

async function mintYoki(privateKey: string, address: string) {
  console.log("Minting Yoki to address:", address);
  console.log("privateKey is set:", !!privateKey);
  const provider = new ethers.providers.JsonRpcProvider(process.env.ASTAR_RPC_URL);
  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(YOKI_CONTRACT_ADDRESS, abi, wallet);
  const tx = await contract.mint(address, YOKI_TOKEN_ID, 1, "0x");
  await tx.wait().catch(console.error);
}

export default mintYoki;
