<template lang="pug">
app-form-container(
  formName="post"
  submitLabel="Post"
  submitAction="savePost"
  submitLink="/career"
  successMessage="Success! Your post has been submitted."
  errorMessage="Oops, something went wrong. Please try again."
  cancelLabel="Cancel"
  cancelLink="/career"
  :formData="formData"
  :rules="rules"
)
  .row
    .col-sm-8
      app-text-input(
        placeholder="Give your post a title (optional)"
        :value="newPostTitle"
        :update="updateNewPostTitle"
      )
  .row
    .col-sm-8
      app-text-field(
        placeholder="Good advice starts with a detailed and specific question..."
        :rows="10"
        prop="newPostText"
        :value="newPostText"
        :update="updateNewPostText"
      )
</template>

<script>
// TODO build in admin overrides for nickname/role
import { mapGetters, mapMutations } from 'vuex';

import { formValidation } from '@/components/mixins';

import AppFormContainer from '@/components/forms/FormContainer';
import AppTextInput from '@/components/forms/TextInput';
import AppTextField from '@/components/forms/TextField';

export default {
  mixins: [formValidation],
  components: { AppFormContainer, AppTextInput, AppTextField },
  data() {
    return {
      gettersToValidate: ['newPostText'],
      rules: {
        newPostText: [
          {
            required: true,
            message: 'Please enter your question first',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['newPostTitle', 'newPostText']),
  },
  methods: {
    ...mapMutations(['updateNewPostTitle', 'updateNewPostText']),
  },
};
</script>
