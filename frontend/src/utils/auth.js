export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const authHeaders = () => {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};


export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/sign-in";
};
