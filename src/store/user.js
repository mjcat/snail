import axios from 'axios';

export default {
  state: {
    token: null,
    tokenExpires: null,
    name: {
      first: null,
      last: null,
    },
    nickname: null,
    linkedIn: {
      company: null,
      role: null,
      roleType: null,
      blacklistedCompanies: [],
    },
    newPost: {
      title: null,
      text: null,
    },
    newComment: {
      postId: null,
      text: null,
    },
    actionStatus: {
      saveUser: null,
      savePost: null,
      saveComment: null,
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.name.first && state.linkedIn.role;
    },
    validToken(state) {
      const now = new Date();
      const token = state.token;
      const tokenExpires = state.tokenExpires;

      return token && tokenExpires && now.getTime() <= tokenExpires.getTime();
    },
    needsToken(state) {
      return !state.token || !state.tokenExpires;
    },
    token(state) { return state.token; },

    firstName(state) { return state.name.first; },
    lastName(state) { return state.name.last; },
    nickname(state) { return state.nickname; },
    companyName(state) { return state.linkedIn.company },
    role(state) { return state.linkedIn.role; },
    roleType(state) { return state.linkedIn.roleType; },
    blacklistedCompanies(state) { return state.linkedIn.blacklistedCompanies; },

    newCommentPostId(state) { return state.newComment.postId; },
    newCommentText(state) { return state.newComment.text; },
    newPostTitle(state) { return state.newPost.title; },
    newPostText(state) { return state.newPost.text; },

    saveUserStatus(state) { return state.actionStatus.saveUser; },
    savePostStatus(state) { return state.actionStatus.savePost; },
    saveCommentStatus(state) { return state.actionStatus.saveComment; },
  },

  mutations: {
    updateToken(state, { token, tokenExpires }) {
      state.token = token;
      state.tokenExpires = tokenExpires;

      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpires', tokenExpires);
    },
    updateFirstName(state, value) {
      state.name.first = value;
    },
    updateLastName(state, value) {
      state.name.last = value;
    },
    updateNickname(state, value) {
      state.nickname = value;
    },
    updateCompany(state, value) {
      state.linkedIn.company = value;
    },
    updateRole(state, value) {
      state.linkedIn.role = value;
    },
    updateRoleType(state, value) {
      state.linkedIn.roleType = value || 'ic';
    },
    updateBlacklistedCompanies(state, values) {
      state.linkedIn.blacklistedCompanies = values;
    },

    updateNewCommentText(state, value) {
      state.newComment.text = value;
    },
    updateNewCommentPostId(state, value) {
      state.newComment.postId = value;
    },
    updateNewPostTitle(state, value) {
      state.newPost.title = value;
    },
    updateNewPostText(state, value) {
      state.newPost.text = value;
    },

    setSaveUserStatus(state, value) {
      state.actionStatus.saveUser = value;
    },
    setSavePostStatus(state, value) {
      state.actionStatus.savePost = value;
    },
    setSaveCommentStatus(state, value) {
      state.actionStatus.saveComment = value;
    },
  },

  actions: {
    async getUser({ commit, state }) {
      const token = state.token;
      if (!token) {
        return;
      }

      try {
        const res = await axios.get('/api/user', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const userData = res.data.userData;
        commit('updateFirstName', userData.name.first || '');
        commit('updateLastName', userData.name.last || '');
        commit('updateNickname', userData.nickname || '');
        commit('updateCompany', userData.linkedIn.company);
        commit('updateRole', userData.linkedIn.role || '');
        commit('updateRoleType', userData.linkedIn.roleType || '');
        commit('updateBlacklistedCompanies', userData.linkedIn.blacklistedCompanies);
      } catch (e) {
        // noop
      }
    },

    async saveUser({ commit, state, dispatch }) {
      commit('setSaveUserStatus', null);

      const token = state.token;
      if (!token) {
        return;
      }

      try {
        const data = {};
        data.userData = {
          firstName: state.name.first,
          lastName: state.name.last,
          role: state.linkedIn.role,
          roleType: state.linkedIn.roleType,
          nickname: state.nickname,
          blacklistedCompanies: state.linkedIn.blacklistedCompanies,
        };

        const options = {};
        options.headers = { 'Authorization': `Bearer ${token}` };

        const res = await axios.post('/api/user', data, options);

        if (res.status === 200) {
          commit('setSaveUserStatus', 'SUCCESS');

          await dispatch('getUser');
        } else {
          commit('setSaveUserStatus', 'ERROR');
        }
      } catch (e) {
        commit('setSaveUserStatus', 'ERROR');
      }
    },

    async saveComment({ commit, state, dispatch }) {
      commit('setSaveCommentStatus', null);

      const token = state.token;
      if (!token) {
        return;
      }

      const postId = state.newComment.postId;

      try {
        const data = { postId };
        data.comment = { text: state.newComment.text };

        const options = {};
        options.headers = { 'Authorization': `Bearer ${token}` };

        const res = await axios.post('/api/posts/comment', data, options);

        if (res.status === 200) {
          commit('setSaveCommentStatus', 'SUCCESS');
          commit('updateNewCommentText', null);

          await dispatch('getPost', postId);
        } else {
          commit('setSaveCommentStatus', 'ERROR');
        }
      } catch (e) {
        commit('setSaveCommentStatus', 'ERROR');
      }
    },

    async savePost({ commit, state }) {
      commit('setSavePostStatus', null);

      const token = state.token;
      if (!token) {
        return;
      }

      try {
        const data = {};
        data.post = state.newPost;

        const options = {};
        options.headers = { 'Authorization': `Bearer ${token}` };

        const res = await axios.post('/api/posts/new', data, options);

        if (res.status === 200) {
          commit('setSavePostStatus', 'SUCCESS');
          commit('updateNewPostTitle', null);
          commit('updateNewPostText', null);
        } else {
          commit('setSavePostStatus', 'ERROR');
        }
      } catch (e) {
        commit('setSavePostStatus', 'ERROR');
      }
    },

    async login({ commit }, { accessCode }) {
      if (!accessCode) {
        return;
      }

      try {
        const res = await axios.post('/api/auth/login', {
          accessCode,
        });

        const token = res.data.user.token;
        const now = new Date();
        const milsecs = res.data.user.expiresIn * 1000;
        const tokenExpires = milsecs ? new Date(now.getTime() + milsecs) : null;

        commit('updateToken', { token, tokenExpires });
      } catch (e) {
        // noop
      }
    },
    logout: ({ commit }) => {
      commit('updateToken', {});
      commit('updateFirstName', null);
      commit('updateLastName', null);
      commit('updateNickname', null);
      commit('updateCompany', null);
      commit('updateRole', null);
      commit('updateRoleType', null);
      commit('updateBlacklistedCompanies', []);
    },
    updateToken: ({ commit }, { token, tokenExpires }) => {
      commit('updateToken', { token, tokenExpires });
    },
  },
};
