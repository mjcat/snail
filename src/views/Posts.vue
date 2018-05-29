<template lang="pug">
.container-fluid
  .row
    .col-md-8
      template(v-for="post in ownPosts")
        app-post-blurb(
          :postId="post.postId"
          :expiresIn="post.expiresIn"
          :title="post.title"
          :description="post.text"
          :nickname="post.nickname"
          :role="post.role"
          :isOwner="post.isOwner"
          :likes="post.votes.likes"
          :laughs="post.votes.laughs"
          :comments="post.commentsCount"
        )
      
      template(v-for="post in otherPosts")
        app-post-blurb(
          :postId="post.postId"
          :expiresIn="post.expiresIn"
          :title="post.title"
          :description="post.text"
          :nickname="post.nickname"
          :role="post.role"
          :isOwner="post.isOwner"
          :likes="post.votes.likes"
          :laughs="post.votes.laughs"
          :comments="post.commentsCount"
        )
</template>

<script>
import { mapGetters } from 'vuex';

import AppPostBlurb from '@/components/posts/Blurb';

export default {
  components: { AppPostBlurb },
  computed: {
    ...mapGetters(['allPosts']),
    ownPosts() { return this.allPosts.ownedPosts; },
    otherPosts() { return this.allPosts.otherPosts; },
  },
};
</script>
