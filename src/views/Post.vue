<template lang="pug">
.container-fluid
  template(v-if="post")
    app-comment(
      :title="post.title"
      :description="post.text"
      :nickname="post.nickname"
      :role="post.role"
      :isOwner="post.isOwner"
      :likes="post.votes.likes"
      :laughs="post.votes.laughs"
      :dislikes="post.votes.dislikes"
      :postId="postId"
    )
    app-comment(v-for="(comment, index) in post.comments"
      :description="comment.text"
      :nickname="comment.nickname"
      :role="comment.role"
      :isOwner="comment.isOwner"
      :likes="comment.votes.likes"
      :laughs="comment.votes.laughs"
      :dislikes="comment.votes.dislikes"
      :postId="postId"
      :commentNumber="index"
    )
    app-new-comment-form
  
  template(v-else)
    p The content has expired or does not exist.
    app-button(path="/career" label="Go back")
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AppComment from '@/components/posts/Comment';
import AppNewCommentForm from '@/components/forms/NewCommentForm';
import AppButton from '@/components/buttons/Button';

export default {
  components: {
    AppComment,
    AppNewCommentForm,
    AppButton,
  },
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
