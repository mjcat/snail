<template lang="pug">
footer.footer
  .container-fluid
    .row
      .col-sm-4.col-xs-12
        .menu
          

      .col-sm-4.col-xs-12
</template>

<script>
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
};
</script>

<style scoped lang="stylus">
@require '../theme';

.footer
  background-color: $white
  width: 100%
  border-top: 1px solid $light-gray
  box-shadow: 0 0 2px $gray--opacity--80
  padding-top: $lg-margin
  padding-bottom: $xl-margin
  margin-top: $xl-margin
</style>
