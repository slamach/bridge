import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://130.61.181.245/api/v1/message/',
});

const messagesAPI = {
  async getMessages(chatId: string, token: string) {
    return axiosInstance.get<{
      payload: {
        content: {
          id: string;
          text: string;
          date: string;
          sentByUser: boolean;
        }[];
      };
    }>('', {
      params: {
        chat: chatId,
        page: 0,
        size: 50,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  async sendMessage(
    senderId: string,
    chatId: string,
    text: string,
    token: string
  ) {
    return axiosInstance.post<unknown>(
      '',
      {
        senderId,
        chatId,
        text,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  },
};

export default messagesAPI;
