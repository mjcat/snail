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
      state.linkedIn.roleType = value;
    },
    updateBlacklistedCompanies(state, values) {
      state.linkedIn.blacklistedCompanies = values;
    },
  },
  actions: {
    async getUser({ commit, state }) {
      const token = state.token;
      if (!token) {
        return;
      }

      try {
        const res = await axios.get('http://localhost:8081/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.userData;
        commit('updateFirstName', userData.name.first);
        commit('updateLastName', userData.name.last);
        commit('updateNickname', userData.nickname);
        commit('updateCompany', userData.linkedIn.company);
        commit('updateRole', userData.linkedIn.role);
        commit('updateRoleType', userData.linkedIn.roleType);
        commit('updateBlacklistedCompanies', userData.linkedIn.blacklistedCompanies);
      } catch (e) {
        // noop
      }
    },
    async login({ commit }, { accessCode }) {
      if (!accessCode) {
        return;
      }

      try {
        const res = await axios.post('http://localhost:8081/api/auth/login', {
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
  },
};
