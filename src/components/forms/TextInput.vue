<template lang="pug">
app-form-item(
  :label="label"
  :description="description"
  :prop="prop"
  :rules="rules"
)
  el-input(
    :placeholder="placeholder"
    :value="value"
    @input="update"
    clearable
  )
</template>

<script>
import AppFormItem from '@/components/forms/FormItem';

export default {
  components: { AppFormItem },
  props: {
    label: String,
    description: String,
    value: {
      type: String,
      default: '',
    },
    update: {
      type: Function,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Please input'
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
