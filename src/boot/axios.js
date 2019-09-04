import axios from 'axios';

axios.defaults.baseURL = '/.netlify/functions';

export default ({ Vue }) => {
  Vue.prototype.$axios = axios;
};
