import Vue from 'vue';
import Vuex from 'vuex';

import daily from './daily';
import story from './story';

Vue.use(Vuex);

export default new Vuex.Store({
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,

  modules: { daily, story },
});
