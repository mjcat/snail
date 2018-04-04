<template lang="pug">
  app-link.btn.btn-primary.primary(:link="link", :label="label")
</template>

<script>
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
  props: ['link', 'label'],
};
</script>

<style lang="stylus" scoped>
  .primary
    background-color: #4E0569
    cursor: pointer
</style>
