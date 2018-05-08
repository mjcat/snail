<template lang="pug">
.container-fluid
  .row
    .col-sm-8
      app-heading-two(
        :title="'Hi ' + firstName + '!'"
        subtitle="Let's check over your information to ensure the perfect experience."
      )
  app-profile-form
</template>

<script>
import { mapGetters } from 'vuex';

import AppHeadingTwo from '@/components/texts/HeadingTwo';

import AppProfileForm from '@/components/forms/ProfileForm';

export default {
  components: { AppHeadingTwo, AppProfileForm },
  computed: {
    ...mapGetters(['firstName']),
  },
};
</script>
