<template lang="pug">
  .heading-one
    h1 {{ title }}
    template(v-if="description")
      p {{ description }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: String,
  }
}
</script>

<style lang="stylus" scoped>
  @require '../../theme'

  h1
    font-size: 50px
    font-weight: 500
    line-height: 50px
    color: $light-gray
    margin-bottom: 20px

  p
    font-size: 20px
    line-height: 25px
    margin-bottom: 10px
    color: $light-gray--opacity--70
    width: 70%
</style>
