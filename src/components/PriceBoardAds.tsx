import React from "react";
import { PriceAds } from "../types";

interface Props {
  data: PriceAds[];
}

const PriceBoardAds: React.FC<Props> = ({ data }) => {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Quảng cáo</h3>
      <table className="w-full border rounded overflow-hidden text-center">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border-r">Thông tin</th>
            <th className="p-3 border-l">Thường</th>
            <th className="p-3 border-l">VIP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 font-medium text-left border-r">Giá</td>
            <td className="p-3 border-l">{data[0].price}</td>
            <td className="p-3 border-l">{data[1].price}</td>
          </tr>
          <tr>
            <td className="p-3 font-medium text-left border-r">Ghi chú</td>
            <td className="p-3 border-l text-left align-top">
              <ul className="list-disc list-inside space-y-1">
                {data[0].note.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </td>
            <td className="p-3 border-l text-left align-top">
              <ul className="list-disc list-inside space-y-1">
                {data[1].note.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default PriceBoardAds;
