import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import posts from './posts';
import data from './data';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    posts,
    data,
  },
});

export default store;
