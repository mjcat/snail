<template lang="pug">
.heading-one
  h1 {{ title }}
  template(v-if="subtitle")
    p {{ subtitle }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme'

h1
  font-size: $xl-font
  font-weight: $slight-bolded
  line-height: $xl-font
  color: $light-gray
  margin-bottom: $md-margin

p
  font-size: $md-font
  line-height: $lg-font
  margin-bottom: $xs-margin
  color: $light-gray--opacity--70
  width: 70%
</style>
