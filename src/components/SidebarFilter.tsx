import React from "react";



const SidebarFilters: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="font-medium mb-2">Lọc theo khoảng giá</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>1-2 Triệu</li>
          <li>2-3 Triệu</li>
          <li>3-5 Triệu</li>
          <li>5-7 Triệu</li>
        </ul>
      </div>
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="font-medium mb-2">Lọc theo diện tích</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Dưới 20m²</li>
          <li>20-30m²</li>
          <li>30-40m²</li>
          <li>Trên 40m²</li>
        </ul>
      </div>
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="font-medium mb-2">Lọc theo khu vực</h4>
        <ul className="text-sm text-gray-600 space-y-1 max-h-40 overflow-auto">
          <li>Hà Nội</li>
          <li>Hải Phòng</li>
          <li>Thanh Hóa</li>
          <li>Đà Nẵng</li>
          <li>TPHCM</li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarFilters;
