<template lang="pug">
  header#header
    .container-fluid
      .row
        .col-md-2.col-xs-6
          header-logo
        .col-md-8
        .col-md-2.col-xs-6
          primary-button
</template>

<script>
import PrimaryButton from '@/components/buttons/Primary';
import HeaderLogo from '@/components/brands/Logo';

export default {
  components: { PrimaryButton, HeaderLogo },
};
</script>

<style scoped lang="stylus">
  #header
    background-color: #fff
    width: 100%
    position: fixed
    z-index: 100
    border-bottom: 1px solid #ccc
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.25)
    top: 0
</style>
