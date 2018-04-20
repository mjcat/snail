<template lang="pug">
app-link#logo(:link="'/'", :label="'VR Tech'")
</template>

<script>
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
};
</script>

<style lang="stylus" scoped>
#logo
  display: inline-block
  line-height: 30px
  font-size: 30px
  font-weight: 50
</style>
