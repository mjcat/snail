<template lang="pug">
  app-form-item(:label="label" :description="description")
    el-select(placeholder="Choose a few" :value="value" @change="update" multiple filterable allow-create default-first-option)
      el-option(v-for="option in options" :key="option" :label="option" :value="option")
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
