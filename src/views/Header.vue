<template lang="pug">
header.header(:class="{ white: isLoggedIn || isMd }")
  .container-fluid
    .row
      .col
        app-header-logo(:secondary="!isLoggedIn && !isMd")
      .col.align-self-end
        template(v-if="isLoggedIn")
          app-user-nav.right.user-nav
          app-button.right(
            label="Get Advice"
            path="/career/new"
          )
        app-button.right(v-else path="/product" label="Learn More" fill)
</template>

<script>
// TODO bug with toggling button fill vs white based on isMd
import { mapGetters } from 'vuex';

import AppButton from '@/components/buttons/Button';
import AppUserNav from '@/components/buttons/UserNav';
import AppHeaderLogo from '@/components/brands/Logo';

export default {
  components: { AppButton, AppUserNav, AppHeaderLogo },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  data() {
    return {
      isMd: document.documentElement.clientWidth <= 768,
    };
  },
  methods: {
    handleResize(e) {
      this.isMd = document.documentElement.clientWidth <= 768;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped lang="stylus">
@require '../theme';

.header
  background-color: $invisible
  width: 100%
  position: fixed
  z-index: 100
  top: 0
  padding-top: $md-margin
  padding-bottom: $md-margin
  &.white
    background-color: $white
    border-bottom: 1px solid $light-gray
    box-shadow: 0 0 2px $gray--opacity--80
  
.right
  float: right
  
.user-nav
  margin-left: $rg-margin
  margin-top: 5px
  @media(min-width: $screen-sm-min)
    margin-left: $lg-margin
</style>
