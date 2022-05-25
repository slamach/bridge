import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://130.61.181.245/api/v1/auth/',
});

const authAPI = {
  async login(username: string, password: string) {
    return axiosInstance.post<{
      payload: {
        userId: string;
        token: string;
      };
    }>('login', { username, password });
  },
  async register(name: string, username: string, password: string) {
    return axiosInstance.post<{
      payload: {
        userId: string;
        token: string;
      };
    }>('register', { name, username, password });
  },
};

export default authAPI;
