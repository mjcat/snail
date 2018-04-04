<template lang="pug">
  app-link.btn.btn-secondary(:link="link", :label="label")
</template>

<script>
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
  props: ['link', 'label'],
};
</script>

<style lang="stylus" scoped></style>
