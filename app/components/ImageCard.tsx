import React from 'react';

interface ImageCardProps {
    image: {
        url: string;
        name: string;
        collectionId: string;
    };
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
          <img className="w-full object-cover" src={image.url} alt={image.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{image.name}</div>
            <p className="text-gray-700 text-base">Collection ID: {image.collectionId}</p>
          </div>
        </div>
      );
};

export default ImageCard;

// return (
//   <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
//     <div className="relative pb-full">
//       <img className="absolute h-full w-full object-cover" src={image.url} alt={image.name} />
//     </div>
//     <div className="px-6 py-4">
//       <div className="font-bold text-xl mb-2">{image.name}</div>
//       <p className="text-gray-700 text-base">Collection ID: {image.collectionId}</p>
//     </div>
//   </div>
// );