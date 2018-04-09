<template lang="pug">
  app-form-item(:label="label" :description="description")
    el-select(placeholder="Choose one" :value="value" @change="update" clearable)
      el-option(v-for="option in options" :key="option.value" :label="option.label" :value="option.value")
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
      required: true,
    },
    update: {
      type: Function,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>
