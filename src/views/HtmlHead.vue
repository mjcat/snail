<template lang="pug">
  .html-head
</template>

<script>
// kept for reference sake
export default {
  created() {
    document.title = 'New Title';
    document.head.querySelector('meta[name=description]').content = 'New Description';
  },
};
</script>
