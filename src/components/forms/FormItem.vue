<template lang="pug">
  el-form-item(:label="label" :required="required")
    template(v-if="description")
      small.form-text.text-muted {{ description }}
    slot
</template>

<script>
export default {
  props: {
    label: String,
    description: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
