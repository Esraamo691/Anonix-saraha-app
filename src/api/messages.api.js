import { api } from "../lib/api";

// SEND
export const sendMessage = (id, data) => api.post(`/messages/send/${id}`, data);

// GET inbox
export const getMessages = () => api.get("/messages/get-messages");

// MARK AS READ
export const markAsRead = (ids) => api.patch("/messages/mark-as-read", { ids });

// TOGGLE VISIBILITY
export const toggleVisibility = (id) =>
  api.patch(`/messages/make-visible/${id}`);

// SOFT DELETE
export const softDeleteMessage = (id) =>
  api.delete(`/messages/soft-delete-message/${id}`);

// HARD DELETE
export const hardDeleteMessage = (id) =>
  api.delete(`/messages/hard-delete-message/${id}`);

// GET SOFT DELETED
export const getSoftDeletedMessages = () =>
  api.get("/messages/soft-delete-messages");
