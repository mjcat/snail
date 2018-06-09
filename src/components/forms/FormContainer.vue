<template lang="pug">
el-form(
  label-position="top"
  size="medium"
  :model="formData"
  :rules="rules"
  :ref="formName"
)
  slot
  .row
    .col
      app-submit-button.inline(
        :label="submitLabel"
        :action="submitAction"
        :link="submitLink"
        :validateForm="validate"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      )
      app-button.inline(
        v-if="cancelLabel"
        :label="cancelLabel"
        :path="cancelLink"
        secondary
      )
</template>

<script>
import AppSubmitButton from '@/components/buttons/Submit';
import AppButton from '@/components/buttons/Button';

export default {
  components: { AppSubmitButton, AppButton },
  props: {
    formName: {
      type: String,
      required: true
    },
    formData: {
      type: Object,
      required: false,
    },
    rules: {
      type: Object,
      required: false,
    },
    submitLabel: String,
    submitLink: {
      type: String,
      required: false,
    },
    submitAction: {
      type: String,
      required: false,
    },
    successMessage: String,
    errorMessage: String,
    // onSubmitHandler: null,
    cancelLabel: {
      type: String,
      required: false,
    },
    cancelLink: null,
    // onCancelHandler: null,
  },
  methods: {
    async validate() {
      let result = true;
      
      try {
        result = await this.$refs[this.formName].validate();
      } catch (e) {
        result = false;
      }

      return result;
    }
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

.inline
  margin-right: $xs-margin
</style>
