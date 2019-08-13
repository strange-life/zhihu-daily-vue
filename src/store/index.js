import Vue from 'vue';
import Vuex from 'vuex';

import { HomeModule } from 'pages/Home';
import { StoryModule } from 'pages/Story';

Vue.use(Vuex);

export default new Vuex.Store({
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,

  modules: { home: HomeModule, story: StoryModule },
});
