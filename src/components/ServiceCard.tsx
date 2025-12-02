import React from "react";
import { Service } from "../types";

interface Props {
  service: Service;
}

const ServiceCard: React.FC<Props> = ({ service }) => {
  return (
    <article className="flex gap-4 bg-white p-4 rounded shadow-sm">
      <div className="w-36 h-28 flex-shrink-0 relative rounded overflow-hidden">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="text-gray-900 font-medium text-lg">{service.name}</h3>
        <p className="text-gray-600 text-sm mt-2">{service.desc}</p>
        <p className="text-sm text-gray-500 mt-1">{service.address}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              {service.poster[0]}
            </div>
            <div>
              <div className="text-gray-700">{service.poster}</div>
              <div className="text-xs">{service.time}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
