import React from "react";
import ImageGrid from "../components/ImageGrid";

const images = [
  {
    id: 1,
    url: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png",
    name: "Ape #2345",
    collectionId: "Bored Apes Yacht Club",
  },
  {
    id: 2,
    url: "https://media.tatler.com/photos/627258d0bc4f55bd13591609/master/w_1600,c_limit/Creepz_04052022_Instagram%20@coldbloodedcreepz_nft.jpg",
    name: "Creepz#2",
    collectionId: "CREEPZ",
  },
  {
    id: 3,
    url: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png",
    name: "Ape #2345",
    collectionId: "Bored Apes Yacht Club",
  },
  {
    id: 4,
    url: "https://media.tatler.com/photos/627258d0bc4f55bd13591609/master/w_1600,c_limit/Creepz_04052022_Instagram%20@coldbloodedcreepz_nft.jpg",
    name: "Creepz#2",
    collectionId: "CREEPZ",
  },
  {
    id: 5,
    url: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png",
    name: "Ape #2345",
    collectionId: "Bored Apes Yacht Club",
  },
  {
    id: 6,
    url: "https://media.tatler.com/photos/627258d0bc4f55bd13591609/master/w_1600,c_limit/Creepz_04052022_Instagram%20@coldbloodedcreepz_nft.jpg",
    name: "Creepz#2",
    collectionId: "CREEPZ",
  },
  {
    id: 7,
    url: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png",
    name: "Ape #2345",
    collectionId: "Bored Apes Yacht Club",
  },
  {
    id: 8,
    url: "https://media.tatler.com/photos/627258d0bc4f55bd13591609/master/w_1600,c_limit/Creepz_04052022_Instagram%20@coldbloodedcreepz_nft.jpg",
    name: "Creepz#2",
    collectionId: "CREEPZ",
  },
];

const Gallery: React.FC = () => {
    return (
      <div className="flex">
        <div className="w-1/2"></div>
        <div className="w-1/2 p-4">
          <h1 className="text-4xl mb-4">Gallery Title</h1>
          <ImageGrid images={images} />
        </div>
      </div>
    );
  };

export default Gallery;