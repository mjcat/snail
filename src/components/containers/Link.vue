<template lang="pug">
a(
  :href="link"
  @click="onClick"
  :class="{ disabled: disabled }"
)
  //- TODO tab index on disabled buttons
  //- slot is for icon
  slot
  | {{ label }}
</template>

<script>
// TODO use router view instead of a tag
export default {
  props: {
    label: String,
    link: { // external urls or click handlers
      type: String,
      default: 'javascript:void(0)',
    },
    onClickHandler: {
      type: Function,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(e) {
      if (this.onClickHandler) {
        e.preventDefault();
        this.onClickHandler();
      }
    }
  },
};
</script>
