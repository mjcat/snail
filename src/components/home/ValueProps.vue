<template lang="pug">
.value-props-container
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
          description: 'Your posts are secured on the Blockchain and can only be accessed with your permission',
        },
        {
          icon: 'fa-user-secret',
          description: 'You are safeguarded from prying eyes of your coworkers, investors, and clients',
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

.value-props-container
  margin-bottom: $xl-margin
</style>
