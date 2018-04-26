import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';

import Home from '@/views/Home';
import Profile from '@/views/Profile';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: async (to, from, next) => {
        if (!store.state.isLoggedIn) {
          await store.dispatch('preflight');
        }
        next();
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/auth/linkedin',
      name: 'LinkedIn Authorization',
      component: Profile, // temp
      beforeEnter: async (to, from, next) => {
        const returnedCsrfToken = to.query.state;
        const error = to.query.error;
        const accessCode = to.query.code;

        if (error || !accessCode) { // TODO csrfToken compare
          next({ name: 'Home' });
        } else {
          await store.dispatch('login', { accessCode });
          if (store.getters.isLoggedIn) {
            next({ name: 'Profile' });
          } else {
            next({ name: 'Home' });
          }
        }
      },
    }
  ],
});

router.beforeEach = async (to, from, next) => {
  // check for expired token, login/logout action
  const now = new Date();
  const tokenExpires = store.state.tokenExpires;
  const expireTs = tokenExpires && new Date(tokenExpires);

  if (expireTs && now.getTime() > expireTs) {
    //await store.dispatch('');
    if (to.name === 'Home') {
      next({ name: 'Profile' }); // TODO redirect to dashboard
    } else {
      next();
    }
  } else {
    await store.dispatch('logout');
    next({ name: 'Home' });
  }
};

export default router;
