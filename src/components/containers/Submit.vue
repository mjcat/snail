<template lang="pug">
a(@click="onClick" href="javascript:void(0)")
  | {{ label }}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: {
    label: String,
    action: String,
    link: {
      type: String,
      required: false,
    },
    validateForm: {
      type: Function,
      required: false,
    },
    successMessage: String,
    errorMessage: String,
  },

  computed: {
    submitStatus() {
      const submitStatusGetter = this.action + 'Status';

      return this.$store.getters[submitStatusGetter];
    },
  },

  methods: {
    ...mapMutations([
      'updateActionFeedback',
      'showLoading',
      'hideLoading'
    ]),
    async onClick(e) {
      e.preventDefault();

      let valid = true;
      if (this.validateForm) {
        valid = await this.validateForm();
      }

      if (valid && this.action) {
        this.showLoading();
        await this.$store.dispatch(this.action);
      }
    }
  },

  watch: {
    submitStatus(status) {
      if (status === 'SUCCESS') {
        this.hideLoading();

        this.updateActionFeedback({
          type: 'success',
          message: this.successMessage,
        });

        if (this.link) {
          this.$router.push({ path: this.link });
        }
      } else if (status === 'ERROR') {
        this.hideLoading();

        this.updateActionFeedback({
          type: 'error',
          message: this.errorMessage,
        });
      }
    },
  },
};
</script>
