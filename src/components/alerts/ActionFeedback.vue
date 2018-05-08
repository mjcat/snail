<template lang="pug">
div
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'actionFeedback'
    ]),
    show() { return this.actionFeedback.show; },
    type() { return this.actionFeedback.type; },
    message() { return this.actionFeedback.message; },
  },
  methods: {
    ...mapMutations(['resetActionFeedback']),
  },
  watch: {
    show(value) {
      if (value) {
        this.resetActionFeedback();
        this.$message({
          showClose: true,
          message: this.message,
          type: this.type,
        });
      }
    },
  },
};
</script>
