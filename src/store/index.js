import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import data from './data';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    data,
  },
});

export default store;
