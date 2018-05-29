<template lang="pug">
app-form-container(
  formName="profile"
  submitLabel="Save"
  submitAction="saveUser"
  submitLink="/career"
  successMessage="Success! Your data has been updated."
  errorMessage="Oops, something went wrong. Please try again."
  cancelLabel="Cancel"
  cancelLink="/career"
  :formData="formData"
  :rules="rules"
)
  .row
    .col-sm-4
      app-text-input(
        label="Nickname"
        description="This is your display name when you post anonomously"
        prop="nickname"
        :value="nickname"
        :update="updateNickname"
      )
    .col-sm-4
      app-text-input(
        label="Current Company"
        description="Your posts are by default hidden from your coworkers"
        prop="companyName"
        :value="companyName"
        :update="updateCompany"
      )
  .row
    .col-sm-4
      app-text-input(
        label="Current Role"
        description=""
        prop="role"
        :value="role"
        :update="updateRole"
      )
    .col-sm-4
      app-select-input(
        label="Role Type"
        description="We prioritize advice from professionals at or above your current level"
        prop="roleType"
        :value="roleType"
        :update="updateRoleType"
        :options="allRoles"
      )
  .row
    .col-8
      app-select-multiple-input(
        label="Companies to Block"
        description="Any persons associated with these companies on LinkedIn will not be able to see your posts. This includes current employees, executives, and board members"
        :value="blacklistedCompanies"
        :update="updateBlacklistedCompanies"
        getSuggestionsApi="/api/user/getCompanySuggestions"
      )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { formValidation } from '@/components/mixins';

import AppFormContainer from '@/components/forms/FormContainer';
import AppTextInput from '@/components/forms/TextInput';
import AppSelectInput from '@/components/forms/SelectInput';
import AppSelectMultipleInput from '@/components/forms/SelectMultipleInput';

export default {
  mixins: [formValidation],
  components: {
    AppTextInput,
    AppSelectInput,
    AppFormContainer,
    AppSelectMultipleInput,
  },
  data() {
    return {
      gettersToValidate: ['nickname', 'companyName', 'role', 'roleType'],
      rules: {
        nickname: [
          {
            required: true,
            message: 'Please pick a nickname',
            trigger: 'blur',
          },
        ],
        companyName: [
          {
            required: true,
            message: 'Please enter your current company',
            trigger: 'blur',
          },
        ],
        role: [
          {
            required: true,
            message: 'Please enter your role',
            trigger: 'blur',
          },
        ],
        roleType: [
          {
            required: true,
            message: 'Please select one',
            trigger: 'change',
          },
        ],
      }
    };
  },
  computed: {
    ...mapGetters([
      'allRoles',
      'nickname',
      'companyName',
      'companyId',
      'role',
      'roleType',
      'blacklistedCompanies',
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
