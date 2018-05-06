<template lang="pug">
el-form-item.large-text(
  :label="label"
  :prop="prop"
  :rules="rules"
)
  template(v-if="description")
    p.description {{ description }}
  slot
</template>

<script>
export default {
  props: {
    label: String,
    description: String,
    rules: {
      type: Array,
      required: false,
    },
    prop: { // For form validation
      type: String,
      required: false,
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
