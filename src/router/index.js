import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import Header from '@/views/Header';
import Footer from '@/views/Footer';
import Home from '@/views/Home';
import RouterLoading from '@/views/RouterLoading';
import Profile from '@/views/Profile';
import Posts from '@/views/Posts';
import Post from '@/views/Post';
import NewPost from '@/views/NewPost';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        header: Header,
      },
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
      components: {
        default: Profile,
        header: Header,
        footer: Footer,
      },
      meta: { requiresAuth: true },
    },
    {
      path: '/career',
      name: 'CareerPosts',
      components: {
        default: Posts,
        header: Header,
        footer: Footer,
      },
      meta: { requiresAuth: true },
      beforeEnter: async (to, from, next) => {
        await store.dispatch('getAllPosts');
        next();
      },
    },
    {
      path: '/career/post/:postId',
      name: 'CareerPost',
      components: {
        default: Post,
        header: Header,
      },
      meta: { requiresAuth: true },
      props: { default: true, header: false },
      beforeEnter: async (to, from, next) => {
        const postId = to.params.postId;
        await store.dispatch('getPost', postId);
        next();
      },
    },
    {
      path: '/career/new',
      name: 'NewPost',
      components: {
        default: NewPost,
        header: Header,
        footer: Footer,
      },
      meta: { requiresAuth: true },
    },
    {
      path: '/auth/linkedin',
      name: 'LinkedIn Authorization',
      components: {
        default: RouterLoading,
      },
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
  } else if (!store.getters.isLoggedIn) {
    await store.dispatch('getUser');
  }

  if (store.getters.isLoggedIn) { 
    routeRequiresAuth ? next() : next({ name: 'CareerPosts' });
  } else {
    routeRequiresAuth ? next({ name: 'Home' }) : next();
  }
});

export default router;
