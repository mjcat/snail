<template lang="pug">
  app-form-item(:label="label" :description="description")
    el-input(placeholder="Please input" :value="value" @input="update" clearable)
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
  },
};
</script>
