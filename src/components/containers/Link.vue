<template lang="pug">
a(:href="link")
  template(v-if="icon")
    i.fa.icon(:class="icon")
  | {{ label }}
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Learn More',
    },
    link: {
      type: String,
      default: 'javascript:void(0)',
    },
    icon: String,
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

.icon
  margin-right: $xs-margin
</style>
