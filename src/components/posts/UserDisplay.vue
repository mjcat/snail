<template lang="pug">
i.fa.icon.fa-user-circle-o.fa-2x
  .info
    .name {{ nickname }}
    .role {{ role }}
</template>

<script>
export default {
  props: {
    nickname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="stylus">
@require '../../theme';

.info
  float: right
  margin-left: $rg-margin
  font-family: $font-family
  
.name
  font-size: $rg-font
  font-weight: $slight-bolded
  color: $brand-accent

.role
  font-size: $xs-font
  line-height: $rg-font

</style>
