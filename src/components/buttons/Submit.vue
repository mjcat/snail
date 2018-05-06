<template lang="pug">
app-submit.btn.btn-outline-primary.submit(
  :label="label"
  :action="action"
  :validateForm="validateForm"
)
</template>

<script>
import AppSubmit from '@/components/containers/Submit';

export default {
  components: { AppSubmit },
  props: ['label', 'action', 'validateForm'],
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

.submit
  color: $brand-light
  border-color: $brand-light
  cursor: pointer
  &:hover
    color: $light-gray
    background-color: $brand-light
</style>
