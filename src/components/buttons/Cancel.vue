<template lang="pug">
app-link.btn.btn-outline-secondary(
  :link="link"
  :label="label"
  :onClickHandler="onClickHandler"
)
</template>

<script>
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
  props: ['link', 'label', 'onClickHandler'],
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

.cancel
  color: $brand-light
  border-color: $brand-light
  cursor: pointer
  &:hover
    color: $light-gray
    background-color: $brand-light
</style>
