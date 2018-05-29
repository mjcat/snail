<template lang="pug">
.full
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    ...mapMutations(['showLoading', 'hideLoading']),
  },
  created() {
    this.showLoading();
  },
  destroyed() {
    this.hideLoading();
  },
};  
</script>

<style lang="stylus" scoped>
.full
  height: 1000px
</style>
