<template lang="pug">
.container-fluid
  app-comment(
    :title="post.title"
    :description="post.text"
    :nickname="post.nickname"
    :role="post.role"
    :isOwner="post.isOwner"
    :likes="post.votes.likes"
    :laughs="post.votes.laughs"
    :dislikes="post.votes.dislikes"
  )
  app-comment(v-for="comment in post.comments"
    :description="comment.text"
    :nickname="comment.nickname"
    :role="comment.role"
    :isOwner="comment.isOwner"
    :likes="comment.votes.likes"
    :laughs="comment.votes.laughs"
    :dislikes="comment.votes.dislikes"
  )
  app-new-comment-form
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AppComment from '@/components/posts/Comment';
import AppNewCommentForm from '@/components/forms/NewCommentForm';

export default {
  components: { AppComment, AppNewCommentForm },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['newCommentPostId']),
    post() {
      return this.$store.getters.post(this.postId);
    },
  },
  methods: {
    ...mapMutations([
      'updateNewCommentText',
      'updateNewCommentPostId',
    ]),
  },
  created() {
    if (this.postId !== this.newCommentPostId) {
      this.updateNewCommentPostId(this.postId);
      this.updateNewCommentText('');
    }
  },
};
</script>
