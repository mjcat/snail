import { allRoles } from '../../utils';

export default {
  state: {
    allRoles,
  },
  getters: {
    allRoles(state) {
      return state.allRoles;
    },
    roleCodes(state) {
      return state.allRoles.map(role => role.value);
    },
  },
};
