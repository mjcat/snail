import { allRoles } from '../../utils';

export default {
  state: {
    allRoles,
    linkedInClientId: '86ywk8dgn15ufb',
  },
  getters: {
    allRoles(state) {
      return state.allRoles;
    },
    roleCodes(state) {
      return state.allRoles.map(role => role.value);
    },
    linkedInAuthUrl(state) {
      return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${state.linkedInClientId}&redirect_uri=${window.location}/auth/linkedin`;
    },
  },
};
