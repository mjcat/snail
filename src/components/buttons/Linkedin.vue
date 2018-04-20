<template lang="pug">
app-link.btn.btn-primary.linkedin(
  :link="linkedInAuthUrl"
  label="Get started with LinkedIn"
  icon="fa-linkedin-square"
)
</template>

<script>
import { mapGetters } from 'vuex';
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
  computed: {
    ...mapGetters(['linkedInAuthUrl']),
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme'

.linkedin
  background-color: $linkedin
</style>
