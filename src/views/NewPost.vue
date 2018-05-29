<template lang="pug">
.container-fluid
  .row
    .col-sm-8
      app-heading-two(
        title="Need advice? We're here to help!"
        subtitle="Put down as much details as possible, and we will get answers in the next 12 hours."
      )
  app-new-post-form
</template>

<script>
import AppHeadingTwo from '@/components/texts/HeadingTwo';
import AppNewPostForm from '@/components/forms/NewPostForm';

export default {
  components: { AppHeadingTwo, AppNewPostForm },
};
</script>
