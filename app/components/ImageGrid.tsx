import React from 'react';
import ImageCard from '../components//ImageCard';

interface ImageGridProps {
  images: Array<any>; // Replace 'any' with the appropriate type for your images
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGrid;
