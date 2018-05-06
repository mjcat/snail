<template lang="pug">
a(@click="onClick")
  | {{ label }}
</template>

<script>
export default {
  props: {
    label: String,
    action: String,
    validateForm: {
      type: Function,
      required: false,
    },
  },
  methods: {
    async onClick(e) {
      e.preventDefault();

      let valid = true;
      if (this.validateForm) {
        valid = await this.validateForm();
      }

      if (valid && this.action) {
        await this.$store.dispatch(this.action);
      }
    }
  },
};
</script>
