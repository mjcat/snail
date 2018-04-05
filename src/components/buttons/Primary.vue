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
@require '../../theme';

.primary
  background-color: $brand-accent
  cursor: pointer
</style>
