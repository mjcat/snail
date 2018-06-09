<template lang="pug">
router-link#logo(to="/" :class="{ secondary: secondary }")
  img(
    src="../../assets/logo.png"
    alt=""
    height="25"
    width="25"
  )
  | Revamp
</template>

<script>
export default {
  props: {
    secondary: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

#logo
  display: inline-block
  line-height: 30px
  font-size: 30px
  font-weight: 50
  color: $brand-accent
  &:hover
    text-decoration: none
  &.secondary
    color: $light-gray

img
  margin-right: $xs-margin
  margin-top: -5px
</style>
