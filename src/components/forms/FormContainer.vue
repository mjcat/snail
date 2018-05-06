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
      app-submit-button(
        :label="submitLabel"
        :action="submitAction"
        :validateForm="validate"
      )
      app-cancel-button(
        :label="cancelLabel"
        :link="cancelLink"
      )
</template>

<script>
import AppSubmitButton from '@/components/buttons/Submit';
import AppCancelButton from '@/components/buttons/Cancel';

export default {
  components: { AppSubmitButton, AppCancelButton },
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
    submitLink: null,
    submitAction: {
      type: String,
      default: '',
    },
    // onSubmitHandler: null,
    cancelLabel: String,
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
