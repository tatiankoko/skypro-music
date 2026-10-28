import axios from 'axios';
import { BASE_URL } from '@/services/constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios.get(BASE_URL + '/catalog/track/all/').then((response) => {
    return response.data.data;
  });
};

type tracksByIdResponse = {
  _id: number;
  name: string;
  items: number[];
  owner: number;
  __v: string;
};

export const getTracksById = (id: number): Promise<tracksByIdResponse> => {
  return axios.get(BASE_URL + `/catalog/selection/${id}/`).then((response) => {
    return response.data.data;
  });
};
