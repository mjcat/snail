<template lang="pug">
app-submit.btn.btn-outline-primary.submit(
  :label="label"
  :action="action"
  :link="link"
  :validateForm="validateForm"
  :successMessage="successMessage"
  :errorMessage="errorMessage"
)
</template>

<script>
import AppSubmit from '@/components/containers/Submit';

export default {
  components: { AppSubmit },
  props: [
    'label',
    'action',
    'link',
    'validateForm',
    'successMessage',
    'errorMessage',
  ],
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
