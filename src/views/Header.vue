<template lang="pug">
  #header
    a#logo(href="/")
      | VR Technologies
    .btn.btn-primary
      | Learn More
</template>

<style scoped lang="stylus">
  #header
    background-color: #fff
    width: 100%
    position: fixed
    z-index: 100
    border-bottom: 1px solid #ccc
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.25)
    padding: 10px 60px
    top: 0

  #logo
    display: inline-block
    line-height: 40px
    font-size: 40px
    font-weight: 50
</style>
