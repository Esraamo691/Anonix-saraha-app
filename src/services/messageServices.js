import api from "../lib/api";

// send anonymous message
export const sendMessage = async (userId, data) => {
  return api.post(`/message/${userId}`, {
    content: data.message,
  });
};

// get messages for user (inbox)
export const getUserMessages = async (userId) => {
  const res = await api.get(`/message/${userId}`);
  return res.data?.result;
};

// get all messages (dashboard/global)
export const getAllMessages = async () => {
  const res = await api.get(`/message/list`);
  return res.data?.result;
};

// delete message
export const deleteMessage = async (messageId) => {
  return api.delete(`/message/${messageId}`);
};
