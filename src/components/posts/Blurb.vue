<template lang="pug">
app-link.link(:href="'/career/post/' + postId")
  app-text-card(
    :isSummary="true"
    :expiresIn="expiresIn"
    :title="title"
    :description="description"
    :nickname="nickname"
    :role="role"
    :isOwner="isOwner"
    :likes="likes"
    :laughs="laughs"
    :comments="comments"
  )
</template>

<script>
import AppLink from '@/components/containers/Link';
import AppTextCard from '@/components/containers/TextCard';

export default {
  components: { AppLink, AppTextCard },
  props: {
    postId: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: Number,
      required: true,
    },
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
    comments: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="stylus">
.link:hover
  text-decoration: none
</style>
