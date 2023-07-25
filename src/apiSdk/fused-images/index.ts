import axios from 'axios';
import queryString from 'query-string';
import { FusedImageInterface, FusedImageGetQueryInterface } from 'interfaces/fused-image';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFusedImages = async (
  query?: FusedImageGetQueryInterface,
): Promise<PaginatedInterface<FusedImageInterface>> => {
  const response = await axios.get('/api/fused-images', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFusedImage = async (fusedImage: FusedImageInterface) => {
  const response = await axios.post('/api/fused-images', fusedImage);
  return response.data;
};

export const updateFusedImageById = async (id: string, fusedImage: FusedImageInterface) => {
  const response = await axios.put(`/api/fused-images/${id}`, fusedImage);
  return response.data;
};

export const getFusedImageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/fused-images/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFusedImageById = async (id: string) => {
  const response = await axios.delete(`/api/fused-images/${id}`);
  return response.data;
};
