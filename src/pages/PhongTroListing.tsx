import React, { useState, useEffect } from "react";
import { Listing, Service, PriceOwner, PriceAds, OrganizationUnit } from "../types";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";
import ServiceCard from "../components/ServiceCard";
import PriceBoardOwner from "../components/PriceBoardOwner";
import PriceBoardAds from "../components/PriceBoardAds";
import SidebarFilters from "../components/SidebarFilter";
import ListingDetail from "./ListingDetail";
import AdvertisementBanner from "../components/AdvertisementBanner";
import { fetchOrganizationUnits, getImageDownloadUrl } from "../services/api";
const Banner = "../assets/banner.png";

const SAMPLE_IMAGE = "../assets/nhatro1";

const PhongTroListing: React.FC = () => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [filterType, setFilterType] = useState<"all" | "phongtro" | "nguyencan">("all");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<"phongtro" | "nguyencan" | "dichvu" | "price">("phongtro");

  // Filter states
  const [filterArea, setFilterArea] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");
  const [provinceCode, setProvinceCode] = useState<string | null>(null);
  const [wardCode, setWardCode] = useState<string | null>(null);

  // API data states
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map OrganizationUnit to Listing
  const mapToListing = (unit: OrganizationUnit, index: number): Listing => {
    const images = unit.imageUrls && unit.imageUrls.length > 0
      ? unit.imageUrls.map(url => getImageDownloadUrl(url))
      : [SAMPLE_IMAGE];

    // Tính giá phòng bằng triệu để filter
    const priceRoomInMillions = unit.priceRoom ? unit.priceRoom / 1000000 : null;

    return {
      id: index + 1,
      title: unit.orgName || `Phòng ${unit.orgCode}`,
      price: unit.priceRoom ? `${unit.priceRoom.toLocaleString('vi-VN')} đ` : "Liên hệ",
      area: unit.acreage ? `${unit.acreage}m²` : "Chưa có",
      address: unit.address || "Chưa có địa chỉ",
      image: images,
      isHot: unit.rentalStatus === "AVAILABLE",
      type: "phongtro", // Default to phongtro, can be adjusted based on orgCode or other criteria
      ownerName: unit.orgName || "Chủ nhà",
      ownerAvatar: "",
      contactLink: unit.phone ? `tel:${unit.phone}` : undefined,
      priceRoomNumber: priceRoomInMillions || undefined, // Lưu giá bằng triệu để filter
    };
  };

  // Fetch listings from API
  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const filters: any = {};

        // Chỉ thêm provinceCode nếu có giá trị
        if (provinceCode && provinceCode.trim() !== '') {
          filters.provinceCode = provinceCode;
        }

        // Chỉ thêm wardCode nếu có giá trị
        if (wardCode && wardCode.trim() !== '') {
          filters.wardCode = wardCode;
        }

        // Add acreage filters if needed
        if (filterArea !== "all") {
          switch (filterArea) {
            case "20":
              filters.maxAcreage = "20";
              break;
            case "30":
              filters.minAcreage = "20";
              filters.maxAcreage = "30";
              break;
            case "40":
              filters.minAcreage = "30";
              filters.maxAcreage = "40";
              break;
            case "50":
              filters.minAcreage = "40";
              break;
          }
        }

        // Add price filters if needed (convert triệu to VNĐ)
        if (filterPrice !== "all") {
          switch (filterPrice) {
            case "2": // 1-2 triệu
              filters.minPrice = "1000000"; // 1 triệu VNĐ
              filters.maxPrice = "2000000"; // 2 triệu VNĐ
              break;
            case "3": // 2-3 triệu
              filters.minPrice = "2000000"; // 2 triệu VNĐ
              filters.maxPrice = "3000000"; // 3 triệu VNĐ
              break;
            case "5": // 3-5 triệu
              filters.minPrice = "3000000"; // 3 triệu VNĐ
              filters.maxPrice = "5000000"; // 5 triệu VNĐ
              break;
            case "7": // 5-7 triệu
              filters.minPrice = "5000000"; // 5 triệu VNĐ
              filters.maxPrice = "7000000"; // 7 triệu VNĐ
              break;
          }
        }

        const units = await fetchOrganizationUnits(filters);
        const mappedListings = units.map((unit, index) => mapToListing(unit, index));
        setListings(mappedListings);
      } catch (err) {
        setError("Không thể tải danh sách phòng trọ. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [filterArea, filterPrice, provinceCode, wardCode]);



  const services: Service[] = [
    {
      id: 1,
      name: "Giặt ủi",
      desc: "Giặt sấy nhanh trong ngày",
      address: "Số 12 Cầu Giấy, Hà Nội",
      poster: "Nguyễn Văn A",
      time: "2 giờ trước",
      image: SAMPLE_IMAGE,
    },
    {
      id: 2,
      name: "Dọn phòng",
      desc: "Dọn vệ sinh phòng theo yêu cầu",
      address: "Chung cư CT1, Trần Duy Hưng",
      poster: "Trần Thị B",
      time: "Hôm qua",
      image: SAMPLE_IMAGE,
    },
    {
      id: 3,
      name: "Gửi xe",
      desc: "Giữ xe an toàn 24/7",
      address: "Tòa nhà 789 Hoàng Đạo Thúy",
      poster: "Hoàng Văn C",
      time: "3 ngày trước",
      image: SAMPLE_IMAGE,
    },
  ];

  const priceBoardOwner: PriceOwner[] = [
    { level: "Miễn phí", duration: "Vĩnh viễn", numPosts: "2", priority: "Không", price: "Miễn phí" },
    { level: "Cơ bản", duration: "30 ngày", numPosts: "8 tin/ngày", priority: "Cơ bản", management: ["Quản lý phòng", "Quản lý người thuê"], price: "200.000đ/30 ngày" },
  ];

  const priceBoardAds: PriceAds[] = [
    { price: "150.000đ/tháng", note: ["Hiển thị dịch vụ", "Đăng 5 tin/ngày"] },
    { price: "250.000đ/tháng", note: ["Hiển thị dịch vụ", "Đăng 10 tin/ngày", "Ưu tiên hiển thị"] },
  ];

  // Filtering listings (client-side filtering for search text and price)
  const filteredListings = listings.filter((item) => {
    const matchType = filterType === "all" || item.type === filterType;
    const matchSearch = searchText === "" || item.title.toLowerCase().includes(searchText.toLowerCase()) || 
                       item.address.toLowerCase().includes(searchText.toLowerCase());

    // Price filter - sử dụng priceRoomNumber đã được tính sẵn
    const matchPrice = (() => {
      if (filterPrice === "all") return true;
      
      // Nếu không có giá (priceRoomNumber là undefined/null), bỏ qua filter giá
      if (item.priceRoomNumber === undefined || item.priceRoomNumber === null) {
        return true; // Hiển thị cả những phòng không có giá
      }
      
      const priceInMillions = item.priceRoomNumber;
      
      switch (filterPrice) {
        case "2":
          return priceInMillions > 0 && priceInMillions <= 2;
        case "3":
          return priceInMillions > 2 && priceInMillions <= 3;
        case "5":
          return priceInMillions > 3 && priceInMillions <= 5;
        case "7":
          return priceInMillions > 5 && priceInMillions <= 7;
        default:
          return true;
      }
    })();

    return matchType && matchSearch && matchPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AdvertisementBanner />
      <Header category={category} setCategory={setCategory} />
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        filterType={filterType}
        setFilterType={setFilterType}
        filterArea={filterArea}
        setFilterArea={setFilterArea}
        filterPrice={filterPrice}
        setFilterPrice={setFilterPrice}
        filterRegion={filterRegion}
        setFilterRegion={setFilterRegion}
        provinceCode={provinceCode}
        setProvinceCode={setProvinceCode}
        wardCode={wardCode}
        setWardCode={setWardCode}
      />
      {selectedListing ? (
<ListingDetail
listing={selectedListing}
onClose={() => setSelectedListing(null)}
/>
) : (

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-12 gap-6">
  <section className="lg:col-span-8 space-y-4">
    {category === "phongtro" || category === "nguyencan" ? (
      <>
        {loading && (
          <div className="text-center py-8 text-gray-500">Đang tải danh sách phòng trọ...</div>
        )}
        {error && (
          <div className="text-center py-8 text-red-500">{error}</div>
        )}
        {!loading && !error && filteredListings.length === 0 && (
          <div className="text-center py-8 text-gray-500">Không tìm thấy phòng trọ nào.</div>
        )}
        {!loading && !error && filteredListings.map((item) => (
          <ListingCard key={item.id} item={item} onSelect={setSelectedListing} />
        ))}
      </>
    ) : null}

    {category === "dichvu" ? (
      // Hiển thị services
      services.map((sv) => <ServiceCard key={sv.id} service={sv} />)
    ) : null}

    {category === "price" ? (
      // Hiển thị bảng giá
      <>
        <PriceBoardOwner data={priceBoardOwner} />
        <PriceBoardAds data={priceBoardAds} />
      </>
    ) : null}
  </section>

  <aside className="lg:col-span-4">
    {category === "phongtro" || category === "nguyencan" ? (
      <SidebarFilters
      />
    ) : null}
  </aside>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <img src={Banner} alt="Banner" />
</div>

</main>)}
<footer className="bg-gray-100 py-6 text-sm text-gray-700">
      <div className="flex justify-center gap-8 mb-2">
        <div>
            <b>Liên hệ với chúng tôi</b><br></br>
            Hotline: <a href="tel:0901234567" className="text-blue-600 hover:underline">0901 234 567</a><br></br>
            Zalo: <a href="tel:0901234567" className="text-blue-600 hover:underline">0901 234 567</a><br></br>
            Email: <a className="text-blue-600 hover:underline">support@thuetro.vn</a><br></br>
            Địa chỉ: <a className="text-blue-600 hover:underline">141 Xuân Thủy</a><br></br>
        </div>
        <div>
          Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM
        </div>
      </div>
    </footer>


      
    </div>
  );
};

export default PhongTroListing;
