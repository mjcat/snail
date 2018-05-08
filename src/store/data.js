import axios from 'axios';

import { allRoles } from '../../utils';

export default {
  state: {
    allRoles,
    preflight: {
      csrfToken: null,
      linkedInClientId: null,
      linkedInRedirectUrl: null,
    },
    notifications: {
      actionFeedback: {
        show: false,
        message: '',
        type: '',
      },
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
    actionFeedback(state) {
      return state.notifications.actionFeedback;
    },
  },
  mutations: {
    updatePreflight(state, data) {
      state.preflight.csrfToken = data.csrfToken;
      state.preflight.linkedInClientId = data.linkedInClientId;
      state.preflight.linkedInRedirectUrl = data.linkedInRedirectUrl;
    },
    updateActionFeedback(state, data) {
      state.notifications.actionFeedback.message = data.message;
      state.notifications.actionFeedback.type = data.type;
      state.notifications.actionFeedback.show = true;
    },
    resetActionFeedback(state) {
      state.notifications.actionFeedback.show = false;
    },
  },
  actions: {
    preflight: async ({ commit }) => {
      try {
        const res = await axios.get('/api/auth/preflight');
        if (res.status === 200 && res.data) {
          commit('updatePreflight', res.data);

          localStorage.setItem('csrfToken', res.data.csrfToken);
        }
      } catch (e) {
        // noop
      }
    },
  },
};
