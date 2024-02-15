import { ref } from 'vue';
import axios from 'axios';

const token = ref(null);
const user = ref(null);

const setToken = newToken => {
  token.value = newToken;
  localStorage.setItem('token', newToken); // Store the token in local storage
};

const setUser = newUser => {
  user.value = newUser;
};

const clearAuthData = () => {
  token.value = null;
  user.value = null;
  localStorage.removeItem('token'); // Remove the token from local storage
};

const login = async credentials => {
  try {
    const response = await axios.post('https://vue-registration-login-ppr1b8pcr-nafis-projects-abcf2012.vercel.app/api/login', credentials);
    const newToken = response.data.token;
    setToken(newToken);
    return newToken;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

const fetchUser = async () => {
  try {
    const response = await axios.get('https://vue-registration-login-ppr1b8pcr-nafis-projects-abcf2012.vercel.app/api/user');
    const newUser = response.data.user;
    setUser(newUser);
    return newUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const useAuth = () => {
  return {
    token,
    user,
    setToken,
    setUser,
    clearAuthData,
    login,
    fetchUser,
  };
};

export default useAuth;