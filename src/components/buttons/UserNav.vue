<template lang="pug">
el-dropdown(placement="bottom")
  i.fa.icon.fa-user-circle.fa-2x
  el-dropdown-menu(slot="dropdown")
    el-dropdown-item
      app-link(link="/profile" label="My Info")
    el-dropdown-item(divided)
      app-link(:onClickHandler="logout" label="Logout")
</template>

<script>
// TODO logout doesn't work (should localstorage be part of actions/mutations?)
import { mapActions } from 'vuex';

import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>
