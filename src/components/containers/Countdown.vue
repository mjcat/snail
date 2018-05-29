<template lang="pug">
p(:class="{ expiring: nearExpiration }") {{ countdown }}
</template>

<script>
const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export default {
  props: {
    expiresIn: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      remaining: 0,
      interval: null,
    };
  },
  computed: {
    countdown() {
      if (this.remaining <= 0) {
        return 'EXPIRED';
      }

      const hours = Math.floor((this.remaining % ONE_DAY) / ONE_HOUR);

      const minutes = Math.floor((this.remaining % ONE_HOUR) / ONE_MINUTE);

      const seconds = Math.floor(this.remaining % ONE_MINUTE);

      let display = '';
      if (hours > 0) {
        display += `${hours}h `;
      }
      
      if (minutes > 0) {
        display += `${minutes}m `;
      }

      display += `${seconds}s`;

      return display;
    },
    nearExpiration() {
      return this.remaining < ONE_HOUR;
    },
  },
  beforeMount() {
    this.remaining = this.expiresIn;

    this.interval = window.setInterval(() => {
      if (this.remaining < 0) {
        clearInterval(this.interval);
      }

      this.remaining--;
    }, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

p
  color: $brand-light
  &.expiring
    color: $error
</style>
