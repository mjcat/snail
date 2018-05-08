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
    actionStatus: {
      updateUser: null,
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
    firstName(state) { return state.name.first; },
    lastName(state) { return state.name.last; },
    nickname(state) { return state.nickname; },
    companyName(state) { return state.linkedIn.company },
    role(state) { return state.linkedIn.role; },
    roleType(state) { return state.linkedIn.roleType; },
    blacklistedCompanies(state) { return state.linkedIn.blacklistedCompanies; },
    token(state) { return state.token; },
    updateUserStatus(state) { return state.actionStatus.updateUser; },
  },
  mutations: {
    updateToken(state, { token, tokenExpires }) {
      state.token = token;
      state.tokenExpires = tokenExpires;
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
    setUpdateUserStatus(state, value) {
      state.actionStatus.updateUser = value;
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
    async updateUser({ commit, state, dispatch }) {
      commit('setUpdateUserStatus', null);

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
          commit('setUpdateUserStatus', 'SUCCESS');

          await dispatch('getUser');
        } else {
          commit('setUpdateUserStatus', 'ERROR');
        }
      } catch (e) {
        commit('setUpdateUserStatus', 'ERROR');
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

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpires', tokenExpires);

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
