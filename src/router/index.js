import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

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
      meta: { requiresAuth: false },
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
      meta: { requiresAuth: true },
    },
    {
      path: '/auth/linkedin',
      name: 'LinkedIn Authorization',
      component: Profile, // temp
      meta: { requiresAuth: false },
      async beforeEnter(to, from, next) {
        const returnedCsrfToken = to.query.state;
        const error = to.query.error;
        const accessCode = to.query.code;

        const csrfToken = localStorage.getItem('csrfToken');
        localStorage.removeItem('csrfToken');
        const csrfSafe = returnedCsrfToken && (!csrfToken || csrfToken === returnedCsrfToken);

        if (!error && accessCode && csrfSafe) {
          await store.dispatch('login', { accessCode });
        }

        next({ name: 'Profile' }); // let beforeEach handle redirects
      },
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresAuth = to.matched.some(r => r.meta.requiresAuth);

  if (store.getters.needsToken) {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('tokenExpires');

    if (token && expires) {
      const tokenExpires = new Date(expires);
      store.dispatch('updateToken', { token, tokenExpires });
    }
  }

  if (!store.getters.validToken) {
    store.dispatch('logout');
  }
  else if (!store.getters.isLoggedIn) {
    await store.dispatch('getUser');
  }

  if (store.getters.isLoggedIn) { 
    routeRequiresAuth ? next() : next({ name: 'Profile' }); // TODO redirect to dashboard
  } else {
    routeRequiresAuth ? next({ name: 'Home' }) : next();
  }
});

export default router;
