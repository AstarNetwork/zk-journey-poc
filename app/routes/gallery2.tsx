import React, { useEffect, useRef, useState } from "react";
import background from "../images/level1.png";
import gacha from "../images/gacha1.png";
import { BridgeIcon, CardIcon, FolderIcon, PoolIcon, LanguageIcon } from "../components/Icons";
import { ConnectWallet } from "@thirdweb-dev/react";

const BLUEZ_ASTAR_API_KEY="67291fdf64266df84f214e4c40163ec4"
const MY_ASTAR_ADDRESS="0xC779CEB0853fa7AB6a38c587c1CFC702e4603d9B"
const LSHY="0xEaFAF3EDA029A62bCbE8a0C9a4549ef0fEd5a400"


export default function Gallery2() {
    const [response, setResponse] = useState<any>(null);
    const [responseStatus, setResponseStatus] = useState<any>(null);
    async function fetchNFTsForOwner(): Promise<any> {
        const url = `https://apidev.bluez.app/api/nft/v3/${BLUEZ_ASTAR_API_KEY}/getNFTsForOwner?owner=${MY_ASTAR_ADDRESS}&chainId=1261120&orderBy=tokenId&pageKey=1&pageSize=100`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        }
        );
        setResponseStatus(response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setResponse(response.json());

        return await response.json();
      }
      fetchNFTsForOwner();
return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gray-900">
        <h1 className="text-4xl font-bold text-white">Gallery</h1>
        <p className="text-white">{responseStatus}</p>
        <p className="text-white">{JSON.stringify(response)}</p>
        </div>
)
}


