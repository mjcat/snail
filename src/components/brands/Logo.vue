<template lang="pug">
router-link#logo(to="/") Revamp
</template>

<script>
// TODO add icon, dont show text at small screensize (to leave room for Ask Anything, perhaps another Logo component?)

export default {
};
</script>

<style lang="stylus" scoped>
#logo
  display: inline-block
  line-height: 30px
  font-size: 30px
  font-weight: 50
  &:hover
    text-decoration: none
</style>
