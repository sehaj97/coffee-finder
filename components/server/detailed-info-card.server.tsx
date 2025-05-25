import React from "react";
import Image from "next/image";

interface CoffeeCardProps {
  name: string;
  address: string;
  rating: number;
  imageUrl: string;
}

const DetailedInfoCard: React.FC<CoffeeCardProps> = ({
  name,
  address,
  rating,
  imageUrl,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col md:flex-row max-w-full gap-4 md:max-w-3xl items-center">
      <div className="flex-1 aspect-square">
        <Image
          width={300}
          height={300}
          src={imageUrl}
          alt={`${name} image`}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1 bg-white/70 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden p-4 md:p-8 self-stretch flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600 text-sm md:text-base mb-2">{address}</p>
        <div className="text-yellow-400 text-lg">{renderStars(rating)}</div>
      </div>
    </div>
  );
};

export default DetailedInfoCard;
