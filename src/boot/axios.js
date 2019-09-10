import axios from 'axios';

axios.defaults.baseURL = '/.netlify/functions';

export default function ({ Vue }) {
  Vue.prototype.$axios = axios;
}
