import React from "react";
import { Listing } from "../types";

interface Props {
  item: Listing;
  onSelect: (listing: Listing) => void;
}

const ListingCard: React.FC<Props> = ({ item, onSelect }) => {
  return (
    <article
      className="flex gap-4 bg-white p-4 rounded shadow-sm cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <div className="w-36 h-28 flex-shrink-0 relative rounded overflow-hidden bg-gray-200">
        {item.image && item.image.length > 0 && (
          <img
            src={item.image[0]}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        )}
        {item.isHot && (
          <div className="absolute left-2 top-2 bg-red-600 text-white px-2 py-0.5 text-xs rounded z-10">
            HOT
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-gray-900 font-medium">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.address}</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-red-500 font-semibold text-lg">{item.price}</div>
            <div className="text-gray-500">{item.area}</div>

          </div>
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
