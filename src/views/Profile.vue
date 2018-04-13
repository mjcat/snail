<template lang="pug">
.container-fluid
  .row
    .col-sm-8
      app-heading-two(
        :title="'Hi ' + firstName + '!'"
        subtitle="Let's check over your information to make sure we give you the perfect experience."
      )
  app-form-container
    .row
      .col-sm-4
        app-text-input(
          label="Nickname"
          description="This is your display name when you post anonomously"
          :value="nickname"
          :update="updateNickname"
        )
      .col-sm-4
        app-text-input(
          label="Current Company"
          description="All of your posts will be automatically hidden from your coworkers"
          :value="company"
          :update="updateCompany"
        )
    .row
      .col-sm-4
        app-text-input(label="Current Role" :value="role" :update="updateRole")
      .col-sm-4
        app-select-input(
          label="Role Type"
          description="describe me"
          :value="roleType"
          :update="updateRoleType"
          :options="allRoles"
        )
    .row
      .col-8
        app-select-multiple-input(
          label="Companies to Exclude"
          :value="blacklistedCompanies"
          :update="updateBlacklistedCompanies"
          :options="['Google', 'Facebook', 'Apple', 'LinkedIn', 'AutoFi']"
        )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AppHeadingTwo from '@/components/texts/HeadingTwo';

import AppFormContainer from '@/components/forms/FormContainer';
import AppTextInput from '@/components/forms/TextInput';
import AppSelectInput from '@/components/forms/SelectInput';
import AppSelectMultipleInput from '@/components/forms/SelectMultipleInput';

export default {
  components: {
    AppHeadingTwo,
    AppTextInput,
    AppSelectInput,
    AppFormContainer,
    AppSelectMultipleInput,
  },
  computed: {
    ...mapGetters([
      'firstName',
      'nickname',
      'company',
      'role',
      'roleType',
      'blacklistedCompanies',
      'allRoles',
    ]),
  },
  methods: {
    ...mapMutations([
      'updateNickname',
      'updateCompany',
      'updateRole',
      'updateRoleType',
      'updateBlacklistedCompanies',
    ]),
  },
};
</script>
