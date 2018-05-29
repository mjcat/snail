<template lang="pug">
#app(v-loading="loading")
  app-action-feedback
  router-view(name="header")
  router-view.content
  router-view(name="footer")
</template>

<script>
import { mapGetters } from 'vuex';

import AppActionFeedback from '@/components/alerts/ActionFeedback';

export default {
  name: 'App',
  components: { AppActionFeedback },
  computed: {
    ...mapGetters(['loading']),
  },
};
</script>

<style lang="stylus">
@require './theme';
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/

#app
  margin-top: 60px
  font-family: $font-family

.content
  margin-top: $xl-margin + $lg-margin
</style>
