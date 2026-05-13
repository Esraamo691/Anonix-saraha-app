import api from "../lib/api";

//get account
export const getCurrentUser = async () => {
  const response = await api.get("/user");
  return response.data?.result;
};
//get refresh token
export const rotateToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");

  const response = await api.get("/user/rotate", {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });

  const result = response.data?.result;

  if (result?.access_token) {
    localStorage.setItem("access_token", result.access_token);
  }

  return result;
};

//get user profile
export const getSharedProfile = async (userId) => {
  const response = await api.get(`/user/${userId}/shared-profile`);
  return response.data?.result;
};

export const updateProfilePicture = async (file) => {
  const formData = new FormData();

  formData.append("attachment", file);

  const response = await api.patch("/user/profile-picture", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  return response.data?.result;
};
export const changePassword = async (data) => {
  const response = await api.patch("/user/password", data);
  return response.data;
};

export const freezeAccount = async () => {
  const response = await api.patch("/user/freeze");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/user/edit-profile", data);

  return response.data?.result;
};
