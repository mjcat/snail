<template lang="pug">
#app
  app-header
  router-view
  app-footer
</template>

<script>
import { mapMutations } from 'vuex';

import AppHeader from '@/views/Header';
import AppFooter from '@/views/Footer';

export default {
  name: 'App',
  components: { AppHeader, AppFooter },
  methods: {
    ...mapMutations(['updateToken']),
  },
  created() {
    const token = localStorage.getItem('token');
    const tokenExpires = localStorage.getItem('tokenExpires');
    
    if (token && tokenExpires) {
      updateToken({ token, tokenExpires });
    }
  },
};
</script>

<style lang="stylus">
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/

#app
  margin-top: 60px
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif

</style>
