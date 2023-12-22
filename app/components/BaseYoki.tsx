import React, { useEffect } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useBalance,
} from "wagmi";

import IpfsImage from "~/components/IpfsImage";
import mintYoki from "~/utils/mintYoki";

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
  {
    name: "balanceOf",
    inputs: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    name: "uri",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

const YOKI_CONTRACT_ADDRESS = "0x4e14510c4DCEB04567CA5752C953c49D13254fe7";
const YOKI_TOKEN_ID = 2;

const BaseYoki = ({privateKey}: {privateKey: string}) => {
  const { address: connectedUserAccount } = useAccount();


  // const { config } = usePrepareContractWrite({
  //   address: YOKI_CONTRACT_ADDRESS,
  //   abi: abi,
  //   functionName: "mint",
  //   args: [address, YOKI_TOKEN_ID, 1, "0x"],
  // });
  // const { data, write } = useContractWrite(config);
  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  const { data: tokenUri } = useContractRead({
    address: YOKI_CONTRACT_ADDRESS,
    chainId: 1261120,
    abi,
    functionName: "uri",
    args: [YOKI_TOKEN_ID],
  });

  const { data: yokiBalance, refetch: refetchBalance } = useContractRead({
    address: YOKI_CONTRACT_ADDRESS,
    chainId: 1261120,
    abi,
    functionName: "balanceOf",
    args: [connectedUserAccount, YOKI_TOKEN_ID],
  });

  useEffect(() => {
    console.log("refetching balance");
    refetchBalance();
  }, [refetchBalance]);

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <div>
        <IpfsImage ipfsLink={tokenUri?.toString().slice(7) || ""} />
        <hr />
      </div>
      <div className="w-1/5">
        <p>Yoki tokens: {yokiBalance?.toString() || "?"}</p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => mintYoki(privateKey, connectedUserAccount || "")}
      >
        Open Capsule
      </button>
    </div>
  );
};

export default BaseYoki;
