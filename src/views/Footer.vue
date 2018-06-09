<template lang="pug">
footer.footer
  .container-fluid
    .row
      .col-sm-4.col-xs-12
        .heading Products
        ul.menu
          li
            router-link(to="TODO") Web app
          li
            app-link(link="" label="Mobile app")
          li
            router-link(to="") Premium

      .col-sm-4.col-xs-12
        .heading Company
        ul.menu
          li
            router-link(to="") About us
          li
            router-link(to="") Contact

      .col-sm-4.col-xs-12.align-self-center
        p.text-center
          span Made with
          i.fa.icon.fa-heart
          span in SF
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
  background-color: $brand-very-light
  width: 100%
  border-top: 1px solid $brand-very-light
  padding-top: $lg-margin
  padding-bottom: $xl-margin
  margin-top: $xl-margin

.heading
  font-size: $md-font
  color: $dark-gray
  margin-bottom: $md-margin

.menu
  padding: 0

li
  list-style-type: none
  margin-bottom: $xs-margin
  
li /deep/ a
  font-size: $rg-font
  color: $dark-gray
  &:hover
    text-decoration: none

p
  color: $dark-gray

span
  margin: 0 7px
</style>
