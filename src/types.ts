export type Listing = {
  id: number;
  title: string;
  price: string;
  area: string;
  address: string;
  image: string[];
  isHot?: boolean;
  type: "phongtro" | "nguyencan";
  ownerName: string;             // tên chủ nhà
  ownerAvatar?: string;          // avatar chủ nhà (không bắt buộc)
  contactLink?: string;          // link liên hệ (không bắt buộc)
  priceRoomNumber?: number;      // giá phòng tính bằng triệu (để filter)
  details?: {                    // thông tin chi tiết về phòng/nguyên căn
    type: string;
    landArea: string;
    usageArea: string;
    pricePerM2: string;
    legal: string;
  };
};


export type Service = {
  id: number;
  name: string;
  desc: string;
  address: string;
  poster: string;
  time: string;
  image: string;
};

export type PriceOwner = {
  level: string;
  duration: string;
  numPosts: string;
  priority: string;
  management?: string[];
  price: string;
};

export type PriceAds = {
  price: string;
  note: string[];
};

// API Types
export type OrganizationUnit = {
  acreage: number | null;
  address: string | null;
  email: string | null;
  id: string;
  imageUrls: string[];
  orgCode: string;
  orgName: string;
  ownerPhone: string | null;
  parentId: string | null;
  phone: string | null;
  priceRoom: number | null;
  rentalStatus: string;
};

export type Province = {
  administrativeLevel: string;
  code: string;
  decree: string;
  englishName: string;
  name: string;
};

export type Commune = {
  administrativeLevel: string;
  code: string;
  decree: string;
  englishName: string;
  name: string;
  provinceCode: string;
  provinceName: string;
};

export type AddressResponse = {
  provinces?: Province[];
  communes?: Commune[];
  requestId: string;
};

export type Advertisement = {
  id?: string;
  imageUrl?: string;
  linkUrl?: string;
  title?: string;
  [key: string]: any;
};