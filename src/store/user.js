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
      return state.name.first && state.company && state.roleType;
    },
    validToken(state) {
      const now = new Date();
      const token = state.token;
      const tokenExpires = state.tokenExpires;
      
      return token && tokenExpires && now.getTime() > tokenExpires.getTime();
    },
  },
  mutations: {
    updateToken(state, value) {
      state.token = value;
    },
    updateTokenExpires(state, seconds) {
      const now = new Date(); 
      state.tokenExpires = new Date(now.getTime() + 1000 * seconds);
    },
    updateName(state, { first, last }) {
      state.name.first = first;
      state.name.last = last;
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
        const userData = await axios.get('http://localhost:8081/api/user', {
          token,
        });

        console.log(userData);
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

        commit('updateToken', res.data.user.token);
        commit('updateTokenExpires', res.data.user.expiresIn);
      } catch (e) {
        // noop
      }
    },
    logout: ({ commit }) => {
      commit('updateToken', null);
      commit('updateTokenExpires', null);
      commit('updateName', {});
      commit('updateNickname', null);
      commit('updateCompany', null);
      commit('updateRole', null);
      commit('updateRoleType', null);
      commit('updateBlacklistedCompanies', []);
    },
  },
};
