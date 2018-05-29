<template lang="pug">
.row(:class="{ 'justify-content-end': isOwner }")
  .col-md-8
    app-text-card(
      :title="title"
      :description="description"
      :nickname="nickname"
      :role="role"
      :isOwner="isOwner"
      :likes="likes"
      :laughs="laughs"
      :dislikes="dislikes"
    )
</template>

<script>
import AppTextCard from '@/components/containers/TextCard';

export default {
  components: { AppTextCard },

  props: {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    laughs: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
};
</script>
