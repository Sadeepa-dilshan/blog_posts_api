import axios from 'axios';

export function register(user) {
  return axios.post('/register', user);
}

export function login(user) {
  return axios.post('/login', user)
    .then(response => {
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    });
}

export function logout() {
  return axios.post('/logout')
    .then(() => {
      localStorage.removeItem('token'); // Remove token from localStorage
      delete axios.defaults.headers.common['Authorization'];
    });
}
