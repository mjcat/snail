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
        console.log('beforeEnter auth')
        const returnedCsrfToken = to.query.state;
        const error = to.query.error;
        const accessCode = to.query.code;

        if (!error && accessCode) { // TODO csrfToken compare
          await store.dispatch('login', { accessCode });
        }

        next({ name: 'Profile' }); // let beforeEach handle redirects
      },
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log('vvv beforeEach', to, from)
  const routeRequiresAuth = to.matched.some(r => r.meta.requiresAuth);

  if (store.getters.needsToken) {
    console.log('try retrieve token from localStorage')
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('tokenExpires');

    if (token && expires) {
      console.log('saving old token data')
      const tokenExpires = new Date(expires);
      store.dispatch('updateToken', { token, tokenExpires });
    }
  }

  if (!store.getters.validToken) {
    console.log('logout')
    store.dispatch('logout');
  }
  else if (!store.getters.isLoggedIn) {
    console.log('getUser')
    await store.dispatch('getUser');
  }

  if (store.getters.isLoggedIn) { 
    console.log('logged in!')
    routeRequiresAuth ? next() : next({ name: 'Profile' }); // TODO redirect to dashboard
  } else {
    console.log('logged out')
    routeRequiresAuth ? next({ name: 'Home' }) : next();
  }
});

export default router;
