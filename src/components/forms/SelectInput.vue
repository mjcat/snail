<template lang="pug">
app-form-item(
  :label="label"
  :description="description"
  :prop="prop"
)
  el-select(
    placeholder="Choose one"
    :value="value"
    @change="update"
  )
    el-option(
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
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
    options: {
      type: Array, // of objects { label, value }
      required: true,
    },
    prop: { // For form validation
      type: String,
      required: false,
    },
  },
};
</script>
