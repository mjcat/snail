import _ from 'lodash';
import axios from 'axios';

export default {
  state: {
    posts: {},
    actionStatus: {
      saveVote: null,
    },
    /**
     *  exampleHashedId: {
          isOwner: Boolean,
          nickname: String,
          role: String,
          title: String,
          text: String,
          votes: { likes: Number, laughs: Number },
          expiresIn: Number,
          commentsCount: Number,
          comments: []
     },
     */
     hash1234: {
      isOwner: true,
      nickname: 'mahjongcat',
      title: 'This is a test',
      role: 'Software Engineer [m]',
      text: 'I\'m a test post that can go on and on and on and on I\'m a test post that can go on and on and on and on I\'m a test post that can go on and on and on and on',
      votes: { likes: 2, laughs: 0, dislikes: 1 },
      expiresIn: 10,
      commentsCount: 1,
      comments: []
     },
     hash2345: {
      isOwner: false,
      nickname: 'mahjongcat2',
      role: 'QA Engineer [ic]',
      title: '',
      text: 'I\'m a test post that can go on and on and on and on',
      votes: { likes: 0, laughs: 1, dislikes: 4 },
      expiresIn: 10000,
      commentsCount: 0,
      comments: []
     },
  },
  
  getters: {
    allPosts(state) {
      const ownedPosts = [];
      const otherPosts = [];

      _.forOwn(state.posts, (post, key) => {
        post.postId = key;

        if (post.isOwner) {
          post.postId = key;
          ownedPosts.push(post);
        } else {
          otherPosts.push(post);
        }
      });

      return { ownedPosts, otherPosts };
    },

    post: state => postId => { return state.posts[postId]; },

    saveVoteStatus(state) { return state.actionStatus.saveVote; },
  },

  mutations: {
    updateAllPosts(state, allPosts) {
      state.posts = allPosts;
    },
    updatePost(state, { postId, post }) {
      state.posts = { ...state.posts };
      state.posts[postId] = post;
    },
    updateVote(state, { postId, type, commentNumber }) {
      const VOTE_TYPES = ['likes', 'dislikes', 'laughs'];
      const post = state.posts[postId];
      
      if (post) {
        if (!commentNumber) {
          ++post.votes[type];
        } else if (commentNumber > 0) {
          ++post.comments[commentNumber].votes[type];
        }

        state.posts = { ...state.posts };
        state.posts[postId] = post;
      }
    },
    setSaveVoteStatus(state, value) {
      state.actionStatus.saveVote = value;
    },
  },

  actions: {
    async getAllPosts({ commit, state, rootGetters }) {
      const token = rootGetters.token;
      if (!token) {
        return;
      }

      try {
        const res = await axios.get('/api/posts/getAll', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.status === 200) {
          const allPosts = res.data.allPosts;
          commit('updateAllPosts', allPosts);
        }
      } catch (e) {
        // noop
      }
    },

    async getPost({ commit, rootGetters }, postId) {
      const token = rootGetters.token;
      if (!token || !postId) {
        return;
      }

      try {
        const res = await axios.get(`/api/posts/getOne/${postId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.status === 200) {
          const post = res.data.post;
          commit('updatePost', { postId, post });
        }
      } catch (e) {
        // noop
      }
    },

    async saveVote({ commit, rootGetters }, { postId, type, commentNumber }) {
      commit('setSaveVoteStatus', null);

      const token = rootGetters.token;
      if (!token || !postId || !type) {
        return;
      }

      try {
        const data = { postId, type, commentNumber };

        const options = {};
        options.headers = { 'Authorization': `Bearer ${token}` };

        const res = await axios.post('/api/posts/vote', data, options);

        if (res.status === 200) {
          commit('setSaveVoteStatus', 'SUCCESS');
          commit('updateVote', { postId, type, commentNumber });
        } else {
          commit('setSaveVoteStatus', 'ERROR');
        }
      } catch (e) {
        commit('setSaveVoteStatus', 'ERROR');
      }
    },
  },
};
