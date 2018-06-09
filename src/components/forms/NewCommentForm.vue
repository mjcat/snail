<template lang="pug">
div
  app-form-container(
    formName="comment"
    submitLabel="Reply"
    submitAction="saveComment"
    successMessage="Success! Your comment has been posted."
    errorMessage="Oops, something went wrong. Please try again."
    :formData="formData"
    :rules="rules"
  )
    .row
      .col
        app-text-field(
          placeholder="TODO"
          prop="newCommentText"
          :value="newCommentText"
          :update="updateNewCommentText"
        )
</template>

<script>
  // TODO build in admin overrides for nickname/role
import { mapGetters, mapMutations } from 'vuex';

import { formValidation } from '@/components/mixins';

import AppFormContainer from '@/components/forms/FormContainer';
import AppTextField from '@/components/forms/TextField';

export default {
  mixins: [formValidation],
  components: { AppFormContainer, AppTextField },
  data() {
    return {
      gettersToValidate: ['newCommentText'],
      rules: {
        newCommentText: [
          {
            required: true,
            message: 'Please enter a reply',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['newCommentText']),
  },
  methods: {
    ...mapMutations(['updateNewCommentText']),
  },
};
</script>
