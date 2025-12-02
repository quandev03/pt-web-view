import React, { useState, useEffect } from "react";
import { fetchProvinces, fetchCommunes } from "../services/api";
import { Province, Commune } from "../types";

interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
  filterType: "all" | "phongtro" | "nguyencan";
  setFilterType: (type: "all" | "phongtro" | "nguyencan") => void;
  filterArea: string;
  setFilterArea: (value: string) => void;
  filterPrice: string;
  setFilterPrice: (value: string) => void;
  filterRegion: string;
  setFilterRegion: (value: string) => void;
  provinceCode: string | null;
  setProvinceCode: (code: string | null) => void;
  wardCode: string | null;
  setWardCode: (code: string | null) => void;
}

const SearchBar: React.FC<Props> = ({
  searchText,
  setSearchText,
  filterArea,
  setFilterArea,
  filterPrice,
  setFilterPrice,
  filterRegion,
  setFilterRegion,
  provinceCode,
  setProvinceCode,
  wardCode,
  setWardCode,
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCommunes, setLoadingCommunes] = useState(false);

  useEffect(() => {
    const loadProvinces = async () => {
      setLoadingProvinces(true);
      const response = await fetchProvinces();
      if (response.provinces) {
        setProvinces(response.provinces);
      }
      setLoadingProvinces(false);
    };
    loadProvinces();
  }, []);

  useEffect(() => {
    if (provinceCode) {
      const loadCommunes = async () => {
        setLoadingCommunes(true);
        setWardCode(null); // Reset ward when province changes
        const response = await fetchCommunes(provinceCode);
        if (response.communes) {
          setCommunes(response.communes);
        }
        setLoadingCommunes(false);
      };
      loadCommunes();
    } else {
      setCommunes([]);
      setWardCode(null);
    }
  }, [provinceCode, setWardCode]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value === "all" ? null : e.target.value;
    setProvinceCode(code);
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value === "all" ? null : e.target.value;
    setWardCode(code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-white rounded shadow p-4">
        <div className="md:col-span-5 flex gap-3 flex-wrap">
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="flex-1 min-w-[150px] border rounded px-3 py-2"
          >
            <option value="all">Diện tích</option>
            <option value="20">Dưới 20m²</option>
            <option value="30">20-30m²</option>
            <option value="40">30-40m²</option>
            <option value="50">Trên 40m²</option>
          </select>

          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="flex-1 min-w-[150px] border rounded px-3 py-2"
          >
            <option value="all">Mức giá</option>
            <option value="2">1-2 Triệu</option>
            <option value="3">2-3 Triệu</option>
            <option value="5">3-5 Triệu</option>
            <option value="7">5-7 Triệu</option>
          </select>

          <select
            value={provinceCode || "all"}
            onChange={handleProvinceChange}
            disabled={loadingProvinces}
            className="flex-1 min-w-[150px] border rounded px-3 py-2"
          >
            <option value="all">Chọn tỉnh/thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>

          <select
            value={wardCode || "all"}
            onChange={handleWardChange}
            disabled={!provinceCode || loadingCommunes}
            className="flex-1 min-w-[150px] border rounded px-3 py-2"
          >
            <option value="all">Chọn xã/phường</option>
            {communes.map((commune) => (
              <option key={commune.code} value={commune.code}>
                {commune.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
