import Vue from 'vue';
import Vuex from 'vuex';

import home from 'pages/Home/store';
import story from 'pages/Story/store';

Vue.use(Vuex);

export default new Vuex.Store({
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,

  modules: { home, story },
});
