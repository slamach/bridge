import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://130.61.181.245/api/v1/chat/',
});

const chatsAPI = {
  async getChats(token: string) {
    return axiosInstance.get<{
      payload: {
        id: string;
        participants: string[];
        lastMessage: {
          id: string;
          text: string;
          date: string;
          sentByUser: boolean;
        };
      }[];
    }>('', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default chatsAPI;
