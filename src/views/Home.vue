<template lang="pug">
home-background
  home-content
</template>

<script>
console.log('home loaded')
import HomeBackground from '@/components/home/HomeBackground';
import HomeContent from '@/components/home/HomeContent';

export default {
  components: { HomeBackground, HomeContent },
};
</script>
