import Vue from 'vue';
import Router from 'vue-router';

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
      beforeEnter(to, from, next) {
        // handle error, redirect
        // handle login as needed, before redirecting to Profile/Dashboard
      },
    }
  ],
});

router.beforeEach((to, from, next) => {
  // check for expired token, login/logout action
});

export default router;