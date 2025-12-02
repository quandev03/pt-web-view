import React from "react";

type HeaderProps = {
  category: "phongtro" | "nguyencan" | "dichvu" | "price";
  setCategory: (cat: "phongtro" | "nguyencan" | "dichvu" | "price") => void;
};

const Header: React.FC<HeaderProps> = ({ category, setCategory }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                PT
              </div>
              <span className="font-semibold text-lg">Phongtro</span>
            </div>
            {/* Menu */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              {["phongtro", "nguyencan", "dichvu", "price"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as any)}
                  className={`hover:text-blue-600 ${
                    category === cat ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  {cat === "phongtro"
                    ? "Phòng trọ"
                    : cat === "nguyencan"
                    ? "Nguyên căn"
                    : cat === "dichvu"
                    ? "Dịch vụ"
                    : "Bảng giá"}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-1 border rounded text-sm">Đăng nhập</button>
            <button className="px-4 py-1 bg-red-500 text-white rounded text-sm">Đăng tin</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
