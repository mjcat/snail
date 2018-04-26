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
    company: null,
    role: null,
    roleType: null,
    blacklistedCompanies: [],
  },
  getters: {
    blacklistedCompanies(state) {
      // current company is first in list, use `...` to not alter array
      // return [state.company, ...state.blacklistedCompanies];
      return state.blacklistedCompanies;
    },
    firstName(state) {
      return state.name.first;
    },
    company(state) {
      return state.company;
    },
    role(state) {
      return state.role;
    },
    roleType(state) {
      return state.roleType;
    },
    email(state) {
      return state.email;
    },
    nickname(state) {
      return state.nickname;
    },
    isLoggedIn(state) {
      return state.name.first && state.company && state.roleType;
    },
  },
  mutations: {
    updateNickname(state, value) {
      state.nickname = value;
    },
    updateCompany(state, value) {
      state.company = value;
    },
    updateRole(state, value) {
      state.role = value;
    },
    updateRoleType(state, value) {
      state.roleType = value;
    },
    updateBlacklistedCompanies(state, values) {
      state.blacklistedCompanies = values;
    },
  },
  actions: {
    getUserData: async () => {},
    login: async ({ commit, rootGetters }, { accessCode }) => {
      console.log('login', accessCode)
      if (!accessCode) {
        return;
      }

      try {
        const res = await axios.post('http://localhost:8081/api/auth/login', {
          accessCode,
        });
      } catch (e) {
        // noop
      }
    },
    logout() {},
  },
};
