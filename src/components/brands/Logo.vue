<template lang="pug">
app-link#logo(:link="'/'", :label="'Revamp'")
</template>

<script>
// TODO add icon, dont show text at small screensize (to leave room for Ask Anything, perhaps another Logo component?)
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
