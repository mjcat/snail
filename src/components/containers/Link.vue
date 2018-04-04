<template lang="pug">
  a(:href="link")
    | {{ label }}
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Learn More',
    },
    link: {
      type: String,
      default: 'javascript:void(0)',
    },
  },
};
</script>
