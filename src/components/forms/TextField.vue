<template lang="pug">
app-form-item(
  :prop="prop"
  :rules="rules"
)
  el-input(
    type="textarea"
    resize="none"
    :rows="rows"
    :placeholder="placeholder"
    :value="value"
    @input="update"
  )
</template>

<script>
import AppFormItem from '@/components/forms/FormItem';

export default {
  components: { AppFormItem },
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    update: {
      type: Function,
      required: true,
    },
    rows: {
      type: Number,
      default: 4,
    },
    rules: {
      type: Array,
      required: false,
    },
    prop: { // For form validation
      type: String,
      required: false,
    },
  },
};
</script>
