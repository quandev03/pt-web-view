import { Listing } from "../types";

type ListingDetailProps = {
  listing: Listing; // <- bắt buộc phải là object Listing
  onClose: () => void;

};

export default function ListingDetail({ listing, onClose }: ListingDetailProps) {
  const { title, price, area, image, ownerName, ownerAvatar } = listing;

  return (
    
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
        <button
        className="mb-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        onClick={onClose}
>
        ← Quay lại
        </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ảnh */}
        <div className="lg:col-span-2 bg-white rounded shadow p-4">
          <img 
            src={image[0]} 
            alt={title} 
            className="w-full h-80 object-cover rounded"
          />
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {image.slice(1).map((img, i) => (
              <img key={i} src={img} alt={`${title} ${i}`} className="w-24 h-24 object-cover rounded"/>
            ))}
          </div>
          <h1 className="text-xl font-semibold mt-4">{title}</h1>
          <div className="text-red-600 font-bold text-lg mt-2">{price}</div>
          <div className="text-gray-500">{area}</div>

          <div className="mt-4">
            <h2 className="font-semibold mb-2">Thông tin cơ bản</h2>
            <ul className="text-gray-600 space-y-1">
              
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold mb-2">Mô tả chi tiết</h2>
            <p className="text-gray-700 whitespace-pre-line">{}</p>
          </div>
        </div>

        {/* Thông tin chủ nhà */}
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              {ownerAvatar ? (
                <img src={ownerAvatar} alt={ownerName} className="w-full h-full object-cover rounded-full"/>
              ) : ownerName[0]}
            </div>
            <div>
              <div className="font-semibold">{ownerName}</div>
              <div className="text-sm text-gray-500">Tin đăng 36 tin</div>
            </div>
          </div>
          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded">
            Liên hệ
          </button>
          <div className="mt-4 border-t pt-2">
            <h3 className="font-medium">Giới thiệu</h3>
            <p className="text-gray-500 mt-1">...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
