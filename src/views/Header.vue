<template lang="pug">
header.header
  .container-fluid
    .row
      .col
        app-header-logo
      .col.align-self-end
        template(v-if="isLoggedIn")
          app-user-nav.right.user-nav
          app-secondary-button.right(
            label="New"
            link="/career/new"
          )
        template(v-else)
          app-primary-button.right(label="Learn More")
</template>

<script>
import { mapGetters } from 'vuex';

import AppPrimaryButton from '@/components/buttons/Primary';
import AppSecondaryButton from '@/components/buttons/Secondary';
import AppUserNav from '@/components/buttons/UserNav';
import AppHeaderLogo from '@/components/brands/Logo';

export default {
  components: { AppPrimaryButton, AppSecondaryButton, AppUserNav, AppHeaderLogo },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
};
</script>

<style scoped lang="stylus">
@require '../theme';

.header
  background-color: $white
  width: 100%
  position: fixed
  z-index: 100
  border-bottom: 1px solid $light-gray
  box-shadow: 0 0 2px $gray--opacity--80
  top: 0
  padding-top: $md-margin
  padding-bottom: $md-margin
  
.right
  float: right
  
.user-nav
  margin-left: $lg-margin
  margin-top: 5px
</style>
