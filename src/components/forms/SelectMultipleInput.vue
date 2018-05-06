<template lang="pug">
app-form-item.multi-select(
  :label="label"
  :description="description"
  :prop="prop"
)
  app-multi-select(
    :value="value"
    :update="update"
    :getSuggestionsApi="getSuggestionsApi"
  )
</template>

<script>
import AppFormItem from '@/components/forms/FormItem';
import AppMultiSelect from '@/components/containers/MultiSelect';

export default {
  components: { AppFormItem, AppMultiSelect },
  props: {
    label: String,
    description: String,
    value: {
      type: Array,
      default: [],
    },
    update: {
      type: Function,
      required: true,
    },
    getSuggestionsApi: {
      type: String,
      required: true,
    },
    prop: { // For form validation
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.multi-select /deep/ .el-select
  width: 100%

.multi-select /deep/ input
  cursor: text
</style>
