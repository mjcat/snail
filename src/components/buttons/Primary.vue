<template lang="pug">
app-link.btn.btn-primary.primary(
  :link="link"
  :label="label"
  :onClickHandler="onClickHandler"
)
</template>

<script>
// TODO merge all buttons into one
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
  props: ['link', 'label', 'onClickHandler'],
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

.primary
  background-color: $brand-accent
  border-color: $brand-accent
  cursor: pointer
</style>
