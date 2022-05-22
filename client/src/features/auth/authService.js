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
    localStorage.setItem("authData", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get("auth/logout");

  if (response.data) {
    localStorage.removeItem("authData");
  }

  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
