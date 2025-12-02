import React, { useState, useEffect } from 'react';
import { fetchRandomAdvertisement, getImageDownloadUrl } from '../services/api';
import { Advertisement } from '../types';

const AdvertisementBanner: React.FC = () => {
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const loadAdvertisement = async () => {
    setIsLoading(true);
    const ad = await fetchRandomAdvertisement();
    if (ad) {
      setAdvertisement(ad);
      
      // Lấy URL ảnh từ quảng cáo
      const adImageUrl = ad.imageUrl || ad.imageUrls?.[0] || ad.fileUrl || '';
      if (adImageUrl) {
        // Sử dụng API download để tải ảnh
        const downloadUrl = getImageDownloadUrl(adImageUrl);
        setImageUrl(downloadUrl);
        setIsVisible(true);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Hiển thị banner ngay khi component mount (lần đầu truy cập)
    loadAdvertisement();

    // Thiết lập interval để hiển thị banner ngẫu nhiên mỗi 5-10 phút
    const getRandomInterval = () => {
      // Random từ 5 đến 10 phút (300000ms đến 600000ms)
      const min = 5 * 60 * 1000; // 5 phút
      const max = 10 * 60 * 1000; // 10 phút
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const scheduleNext = () => {
      const interval = getRandomInterval();
      setTimeout(() => {
        loadAdvertisement();
        scheduleNext();
      }, interval);
    };

    // Bắt đầu lên lịch cho lần hiển thị tiếp theo
    scheduleNext();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setImageUrl('');
  };

  if (!isVisible || !advertisement || !imageUrl) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-colors z-10"
          aria-label="Đóng quảng cáo"
          title="Đóng quảng cáo"
        >
          ×
        </button>
        {isLoading && (
          <div className="p-8 text-center text-gray-500">
            Đang tải quảng cáo...
          </div>
        )}
        {!isLoading && (
          <div className="p-4">
            {advertisement.linkUrl ? (
              <a
                href={advertisement.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={imageUrl}
                  alt={advertisement.title || 'Quảng cáo'}
                  className="w-full h-auto rounded"
                  onError={(e) => {
                    console.error('Error loading advertisement image:', imageUrl);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </a>
            ) : (
              <img
                src={imageUrl}
                alt={advertisement.title || 'Quảng cáo'}
                className="w-full h-auto rounded"
                onError={(e) => {
                  console.error('Error loading advertisement image:', imageUrl);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementBanner;

