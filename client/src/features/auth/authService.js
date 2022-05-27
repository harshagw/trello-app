import axios from "../../app/axios";

// Register user
const register = async (userData) => {
  const response = await axios.post("auth/register", userData);

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post("auth/login", userData);

  if (response.data) {
    localStorage.setItem("authData", JSON.stringify(response.data.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get("auth/logout");

  localStorage.removeItem("authData");

  return response.data;
};

// const refresh = async () => {
//   console.log("runnning refresh");
//   const response = await axios.get("auth/refresh");
//   return response.data;
// };

const authService = {
  register,
  logout,
  login,
  // refresh,
};

export default authService;
