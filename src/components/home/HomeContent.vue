<template lang="pug">
.container-fluid
  #main
    .home-content
      .row
        .col-md-6.align-self-center
          app-heading-one(
            title="Secure career advising platform powered by Blockchain"
          )
        .col-md-6
          .row
            .col-xs-12.col-sm-8.offset-sm-2.col-md-12.offset-md-0.col-lg-8.offset-lg-2
              app-opaque-box
                app-value-props
                //- TODO better implementation of .text-center to stretch button
                .text-center
                  app-linkedin-button
                  el-popover(
                    placement="top"
                    width="350"
                    trigger="click"
                    content="We leverage LinkedIn's data to aggressively root out fake accounts and keep your information and identity safe."
                  )
                    .tip(slot="reference")
                      | Why can't I sign up with my email?
</template>

<script>
import AppHeadingOne from '@/components/texts/HeadingOne';
import AppOpaqueBox from '@/components/home/OpaqueBox';
import AppValueProps from '@/components/home/ValueProps';
import AppLinkedinButton from '@/components/buttons/Linkedin';

export default {
  components: {
    AppHeadingOne,
    AppOpaqueBox,
    AppValueProps,
    AppLinkedinButton,
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

.tip
  color: $light-gray
  margin-top: $rg-margin
  cursor: pointer
</style>
