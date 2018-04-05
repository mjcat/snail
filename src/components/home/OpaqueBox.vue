<template lang="pug">
  .opaque-box
    slot
</template>

<style lang="stylus" scoped>
  @require '../../theme'

  .opaque-box
    padding: $lg-margin
    border-radius: 10px
    width: 100%
    background-color: $light-gray--opacity--40
    color: $light-gray
    position: relative
</style>