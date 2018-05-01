import axios from 'axios';

import { allRoles } from '../../utils';

export default {
  state: {
    allRoles,
    serverBaseUrl: null,
    preflight: {
      csrfToken: null,
      linkedInClientId: null,
      linkedInRedirectUrl: null,
    },
  },
  getters: {
    allRoles(state) {
      return state.allRoles;
    },
    roleCodes(state) {
      return state.allRoles.map(role => role.value);
    },
    linkedInAuthUrl(state) {
      return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${state.preflight.linkedInClientId}&redirect_uri=${state.preflight.linkedInRedirectUrl}&state=${state.preflight.csrfToken}`;
    },
  },
  mutations: {
    updatePreflight(state, data) {
      state.preflight.csrfToken = data.csrfToken;
      state.preflight.linkedInClientId = data.linkedInClientId;
      state.preflight.linkedInRedirectUrl = data.linkedInRedirectUrl;
      state.serverBaseUrl = data.serverBaseUrl;
    },
  },
  actions: {
    preflight: async ({ commit }) => {
      try {
        const res = await axios.get('http://localhost:8081/api/auth/preflight');
        if (res.status === 200 && res.data) {
          commit('updatePreflight', res.data);
        }
      } catch (e) {
        // noop
      }
    },
  },
};
