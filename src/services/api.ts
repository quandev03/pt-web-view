import { OrganizationUnit, AddressResponse, Advertisement } from '../types';

const API_BASE_URL = 'https://api.quannh.click/sale-service/public/api/v1';
const IMAGE_BASE_URL = 'https://api.quannh.click/sale-service/public/';
const IMAGE_DOWNLOAD_API = 'https://api.quannh.click/sale-service/public/api/v1/files/download?fileUrl=';

export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${IMAGE_BASE_URL}${imagePath}`;
};

/**
 * Lấy URL ảnh từ API download
 * @param fileUrl - URL của file ảnh cần tải
 * @returns URL đầy đủ để tải ảnh từ API
 */
export const getImageDownloadUrl = (fileUrl: string | null | undefined): string => {
  if (!fileUrl) return '';
  
  // Nếu đã là URL đầy đủ từ API download, trả về luôn
  if (fileUrl.includes('/files/download?fileUrl=')) {
    return fileUrl;
  }
  
  // Nếu là URL đầy đủ (http/https), encode và tạo download UR
  
  // Nếu là relative path, tạo full URL trước rồi encode

  
  return `${IMAGE_DOWNLOAD_API}${encodeURIComponent("/"+fileUrl)}`;
};

export interface OrganizationUnitFilters {
  minAcreage?: string | null;
  maxAcreage?: string | null;
  provinceCode?: string | null;
  wardCode?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
}

export const fetchOrganizationUnits = async (
  filters: OrganizationUnitFilters = {}
): Promise<OrganizationUnit[]> => {
  const params = new URLSearchParams();
  
  // Chỉ thêm param khi có giá trị (không null và không rỗng)
  if (filters.minAcreage && filters.minAcreage.trim() !== '') {
    params.append('minAcreage', filters.minAcreage);
  }
  
  if (filters.maxAcreage && filters.maxAcreage.trim() !== '' && filters.maxAcreage !== 'null') {
    params.append('maxAcreage', filters.maxAcreage);
  }
  
  if (filters.provinceCode && filters.provinceCode.trim() !== '' && filters.provinceCode !== 'null') {
    params.append('provinceCode', filters.provinceCode);
  }
  
  if (filters.wardCode && filters.wardCode.trim() !== '' && filters.wardCode !== 'null') {
    params.append('wardCode', filters.wardCode);
  }
  
  if (filters.minPrice && filters.minPrice.trim() !== '') {
    params.append('minPrice', filters.minPrice);
  }
  
  if (filters.maxPrice && filters.maxPrice.trim() !== '') {
    params.append('maxPrice', filters.maxPrice);
  }
  
  const queryString = params.toString();
  const url = queryString 
    ? `${API_BASE_URL}/organization-unit/available?${queryString}`
    : `${API_BASE_URL}/organization-unit/available`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching organization units:', error);
    return [];
  }
};

export const fetchProvinces = async (): Promise<AddressResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/address`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return { provinces: [], requestId: '' };
  }
};

export const fetchCommunes = async (provinceCode: string): Promise<AddressResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/address/${provinceCode}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching communes:', error);
    return { communes: [], requestId: '' };
  }
};

export const fetchRandomAdvertisement = async (): Promise<Advertisement | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/advertisements/view/random`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching advertisement:', error);
    return null;
  }
};

