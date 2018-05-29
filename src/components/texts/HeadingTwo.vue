<template lang="pug">
.heading-two
  h2 {{ title }}
  template(v-if="subtitle")
    p {{ subtitle }}
</template>

<script>
// TODO merge all headings into one
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

h2
  font-size: $lg-font
  font-weight: $slight-bolded
  line-height: $lg-font
  color: $dark-gray
  margin-bottom: $md-margin

p
  font-size: $sm-font
  line-height: $md-font
  margin-bottom: $xs-margin
  color: $gray
</style>
