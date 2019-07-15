export default ({ Vue }) => {
  Vue.prototype.$utils = {
    proxyImage: url => `${window.location.origin}/.netlify/functions/image?url=${url}`,
  };
};
