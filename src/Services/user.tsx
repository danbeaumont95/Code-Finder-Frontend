import axios from 'axios';
import { UserToSignUp, UserToLogin } from '../Components/interfaces';

const register: any = async (user: UserToSignUp) => {
  const newUser = await axios.post('http://127.0.0.1:8000/codefinder/api', user)
    .catch((err) => ({ data: { message: err.response.data } }));
  return newUser;
};

const login: any = async (user: UserToLogin) => {
  const newLogin = await axios.post('http://127.0.0.1:8000/codefinder/login', user)
    .catch((err) => ({ data: { message: err.response.data } }));
  return newLogin;
};

const UserService = {
  register,
  login,
};

export default UserService;
