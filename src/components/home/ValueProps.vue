<template lang="pug">
.container-fluid
  .row.align-items-center.value-prop(v-for="value in valueProps")
    .col-2
      i.icon.fa.fa-2x(v-bind:class="value.icon")
    .col-10
      p {{ value.description }}
</template>

<script>
export default {
  data() {
    return {
      valueProps: [
        {
          icon: 'fa-clock-o',
          description: 'Get actionable advice within 2 hours of posting',
        },
        {
          icon: 'fa-lock',
          description: 'Posts are permanently deleted after 24 hours to protect your privacy',
        },
        {
          icon: 'fa-user-secret',
          description: 'All records are permanently deleted after 24 hours to protect your privacy',
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme'

p
  margin-bottom: 0

.value-prop
  margin-bottom: $lg-margin
</style>
