import React from "react";
import { PriceOwner } from "../types";

interface Props {
  data: PriceOwner[];
}

const PriceBoardOwner: React.FC<Props> = ({ data }) => {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Chủ trọ</h3>
      <table className="w-full border rounded overflow-hidden text-center">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border-r">Thông tin</th>
            {data.map((item, i) => (
              <th key={i} className="p-3 border-l">{item.level}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 font-medium text-left border-r">Thời gian</td>
            {data.map((item, i) => (
              <td key={i} className="p-3 border-l">{item.duration}</td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-medium text-left border-r">Số tin</td>
            {data.map((item, i) => (
              <td key={i} className="p-3 border-l">{item.numPosts}</td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-medium text-left border-r">Độ ưu tiên</td>
            {data.map((item, i) => (
              <td key={i} className="p-3 border-l">{item.priority}</td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-medium text-left border-r">Dịch vụ quản lý</td>
            {data.map((item, i) => (
              <td key={i} className="p-3 border-l text-left align-top">
                {item.management && item.management.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {item.management.map((svc, j) => (
                      <li key={j}>{svc}</li>
                    ))}
                  </ul>
                ) : (
                  <span>-</span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-medium text-left border-r">Giá</td>
            {data.map((item, i) => (
              <td key={i} className="p-3 font-semibold text-blue-600 border-l">{item.price}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default PriceBoardOwner;
