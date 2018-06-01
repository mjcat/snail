<template lang="pug">
app-link.btn(
  :class="classMap"
  :link="link"
  :label="label"
  :onClickHandler="onClickHandler"
)
</template>

<script>
import AppLink from '@/components/containers/Link';

export default {
  components: { AppLink },
  props: {
    link: String,
    label: String,
    onClickHandler: Function,
    secondary: {
      type: Boolean,
      default: false,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      classMap: {
        primary: !this.secondary && !this.fill && !this.white,
        secondary: this.secondary,
        fill: this.fill,
        white: this.white,
      },
    };
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

.btn
  cursor: pointer
  &:hover
    cursor: pointer

.primary
  color: $brand-light
  border-color: $brand-light
  &:hover
    color: $light-gray
    background-color: $brand-light

.secondary
  color: $gray
  border-color: $gray
  &:hover
    color: $light-gray
    background-color: $gray

.fill
  color: $white
  background-color: $brand-accent
  border-color: $brand-accent
  
.white
  color: $white
  border-color: $white
  &:hover
    border-color: $brand-light
</style>
