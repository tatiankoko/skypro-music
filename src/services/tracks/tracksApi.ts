import axios from 'axios';
import { BASE_URL } from '@/services/constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = async (): Promise<TrackType[]> => {
  const response = await axios.get(BASE_URL + '/catalog/track/all/');
  return response.data.data;
};

type tracksByIdResponse = {
  _id: number;
  name: string;
  items: number[];
  owner: number;
  __v: string;
};

export const getTracksById = async (
  id: number,
): Promise<tracksByIdResponse> => {
  const response = await axios.get(BASE_URL + `/catalog/selection/${id}/`);
  return response.data.data;
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
  /*.then((response) => {
      return response.data.data;
    })*/
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const getFavoriteTracks = async (
  access: string,
): Promise<TrackType[]> => {
  const response = await axios.get(BASE_URL + '/catalog/track/favorite/all/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data.data;
};
