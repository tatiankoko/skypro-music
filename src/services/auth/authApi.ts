import axios from 'axios';
import { BASE_URL } from '@/services/constants';

type authUserProps = {
  email: string;
  password: string;
};

type authUserResponse = {
  email: string;
  username: string;
  _id: number;
};

export const authUser = (data: authUserProps): Promise<authUserResponse> => {
  return axios
    .post(BASE_URL + '/user/login/', data, {
      headers: {
        // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
        'content-type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    });
};

type regUserProps = {
  email: string;
  password: string;
  username: string;
};

type regUserResponse = {
  message: string;
  result?: {
    username: string;
    email: string;
    _id: number;
  };
  success?: boolean;
};

export const registerUser = (data: regUserProps): Promise<regUserResponse> => {
  return axios
    .post(BASE_URL + '/user/signup/', data, {
      headers: {
        // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
        'content-type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    });
};

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

export const getTokens = (data: authUserProps): Promise<tokensType> => {
  return axios.post(BASE_URL + '/user/token/', data).then((response) => {
    return response.data;
  });
};

export const refreshToken = (data: string): Promise<accessTokenType> => {
  return axios
    .post(BASE_URL + '/user/token/refresh/', data)
    .then((response) => {
      return response.data;
    });
};
