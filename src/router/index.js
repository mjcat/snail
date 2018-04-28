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
          
          if (store.getters.validToken) {
            await store.dispatch('getUser');
            next({ name: 'Profile' });
          }
        }

        next(); // let beforeEach handle redirects
      },
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log('vvv beforeEach', to, from)
  const routeRequiresAuth = to.matched.some(r => r.meta.requiresAuth);
  
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
    if (routeRequiresAuth) {
      next();
    } else {
      next({ name: 'Profile' }); // TODO redirect to dashboard
    }
  } else {
    console.log('logged out')
    if (routeRequiresAuth) {
      next({ name: 'Home' });
    } else {
      next();
    }
  }
});

export default router;
