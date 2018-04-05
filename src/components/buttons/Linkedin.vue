<template lang="pug">
app-link.btn.btn-primary.linkedin(link="https://www.linkedin.com" label="Get started with LinkedIn" icon="fa-linkedin-square")
</template>

<script>
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
};
</script>

<style lang="stylus" scoped>
@require '../../theme'

.linkedin
  background-color: $linkedin
</style>