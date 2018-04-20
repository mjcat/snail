<template lang="pug">
el-form-item.large-text(:label="label" :required="required")
  template(v-if="description")
    p.description {{ description }}
  slot
</template>

<script>
export default {
  props: {
    label: String,
    description: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme.styl'

.large-text
  margin-bottom: $lg-margin

.large-text /deep/ .el-form-item__label
  font-size: $sm-font
  color: $dark-gray
  margin-bottom: 0

.large-text /deep/ .description
  font-size: $xs-font
  color: $gray
  line-height: $xs-font
</style>
