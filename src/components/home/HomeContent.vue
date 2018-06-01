<template lang="pug">
.container-fluid
  #main
    .home-content
      .row
        .col-md-6.align-self-center
          app-heading-one(
            title="Learn, Share, and Accelerate Career Growth"
            subtitle="Get real-time career advice from When you can't avoid workplace politics, learn to crush it."
          )
        .col-md-6
          .row
            .col-xs-12.col-sm-8.offset-sm-2.col-md-12.offset-md-0.col-lg-8.offset-lg-2
              app-opaque-box
                app-value-props
                //- TODO better implementation of .text-center to stretch button
                .text-center
                  app-linkedin-button
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
