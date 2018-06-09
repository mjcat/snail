<template lang="pug">
.container-fluid
  .row
    .col-sm-8
      app-heading-two(
        title="Need advice? We're here to help!"
        subtitle="Put down as much details as possible, and we will get answers in the next 12 hours."
      )
  app-new-post-form
  .row
    .col-sm-8
      .tip
        p Friendly tip: in the next 12 hours, your question will be actively discussed and answered by our community. Users affliated with the companies you blocked will not be able to see or comment.
        p After 12 hours, your post and all comments will expire to keep your information safe. The discussion will be stored on the Blockchain and only you can access it going forward.
</template>

<script>
import AppHeadingTwo from '@/components/texts/HeadingTwo';
import AppNewPostForm from '@/components/forms/NewPostForm';

export default {
  components: { AppHeadingTwo, AppNewPostForm },
};
</script>

<style lang="stylus" scoped>
@require '../theme';

.tip
  margin-top: $md-margin
  color: $gray
</style>
