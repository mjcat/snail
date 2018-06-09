<template lang="pug">
el-dropdown(placement="bottom" trigger="click")
  i.fa.icon.fa-user-circle.fa-2x
  el-dropdown-menu.menu(slot="dropdown")
    el-dropdown-item
      router-link(to="/profile") My Info
    el-dropdown-item(divided)
      app-link(:onClickHandler="performLogout" label="Logout")
</template>

<script>
import { mapActions } from 'vuex';

import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
  methods: {
    ...mapActions(['logout']),
    performLogout() {
      this.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="stylus">
.menu /deep/ a:hover
  text-decoration: none
</style>
