import axios from 'axios';
import queryString from 'query-string';
import { KamenRiderImageInterface, KamenRiderImageGetQueryInterface } from 'interfaces/kamen-rider-image';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getKamenRiderImages = async (
  query?: KamenRiderImageGetQueryInterface,
): Promise<PaginatedInterface<KamenRiderImageInterface>> => {
  const response = await axios.get('/api/kamen-rider-images', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createKamenRiderImage = async (kamenRiderImage: KamenRiderImageInterface) => {
  const response = await axios.post('/api/kamen-rider-images', kamenRiderImage);
  return response.data;
};

export const updateKamenRiderImageById = async (id: string, kamenRiderImage: KamenRiderImageInterface) => {
  const response = await axios.put(`/api/kamen-rider-images/${id}`, kamenRiderImage);
  return response.data;
};

export const getKamenRiderImageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/kamen-rider-images/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteKamenRiderImageById = async (id: string) => {
  const response = await axios.delete(`/api/kamen-rider-images/${id}`);
  return response.data;
};
