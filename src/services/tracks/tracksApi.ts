import axios from 'axios';
import { BASE_URL } from '@/services/constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((response) => {
    console.log(response.data.data);
    return response.data.data;
  });
};
