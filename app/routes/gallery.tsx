import React, { useState } from "react";
import ImageCard from "../components/ImageCard";

const cards = [
  {
    url: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png",
    name: "Ape #2345",
    collectionId: "Bored Apes Yacht Club",
  },
  {
    url: "https://media.tatler.com/photos/627258d0bc4f55bd13591609/master/w_1600,c_limit/Creepz_04052022_Instagram%20@coldbloodedcreepz_nft.jpg",
    name: "Creepz#9",
    collectionId: "CREEPZ",
  },
  {
    url: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png",
    name: "Ape #2346",
    collectionId: "Bored Apes Yacht Club",
  },
  {
    url: "https://media.tatler.com/photos/627258d0bc4f55bd13591609/master/w_1600,c_limit/Creepz_04052022_Instagram%20@coldbloodedcreepz_nft.jpg",
    name: "Creepz#1",
    collectionId: "CREEPZ",
  },
  {
    url: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png",
    name: "Ape #2347",
    collectionId: "Bored Apes Yacht Club",
  },
  {
    url: "https://media.tatler.com/photos/627258d0bc4f55bd13591609/master/w_1600,c_limit/Creepz_04052022_Instagram%20@coldbloodedcreepz_nft.jpg",
    name: "Creepz#2",
    collectionId: "CREEPZ",
  },
  {
    url: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png",
    name: "Ape #2348",
    collectionId: "Bored Apes Yacht Club",
  },
  {
    url: "https://media.tatler.com/photos/627258d0bc4f55bd13591609/master/w_1600,c_limit/Creepz_04052022_Instagram%20@coldbloodedcreepz_nft.jpg",
    name: "Creepz#3",
    collectionId: "CREEPZ",
  },
];

const Gallery: React.FC = () => {
  const [oma, setOma] = useState<number>(4);

  return (
    <div className="flex justify-between h-screen p-4">
      <div className="w-1/5">
        <p>{oma}</p>
        <ImageCard image={cards[1]} />
      </div>
      <div className="w-1/5 flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Open
        </button>
      </div>
      <div className="w-1/5 flex flex-col space-y-4">
      {cards.slice(0, 3).map((card) => (
          <ImageCard key={card.name} image={card} />
        ))}
      </div>
      <div className="w-1/5 flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Evolve
        </button>
      </div>
      <div className="w-1/5 flex flex-col space-y-4">
        {cards.slice(0, 3).map((card) => (
          <ImageCard key={card.name} image={card} />
        ))}
      </div>
    </div>
  );
  };

export default Gallery;
