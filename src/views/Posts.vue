<template lang="pug">
.container-fluid
  .row
    .col-md-8(v-if="ownPosts.length || otherPosts.length")
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
    .col(v-else)
      app-heading-two(
        title="Based on your settings, we are unable to find any active discussions for you."
        :subtitle="'But there are ' + smallRandom + ' professionals online right now!'"
      )
      app-button(
        path="/career/new"
        label="Ask a question"
        primary
      )
</template>

<script>
import { mapGetters } from 'vuex';

import AppPostBlurb from '@/components/posts/Blurb';
import AppButton from '@/components/buttons/Button';
import AppHeadingTwo from '@/components/texts/HeadingTwo';

export default {
  components: { AppPostBlurb, AppButton, AppHeadingTwo },
  computed: {
    ...mapGetters(['allPosts']),
    ownPosts() { return this.allPosts.ownedPosts; },
    otherPosts() { return this.allPosts.otherPosts; },
    smallRandom: () => Math.floor(Math.random() * (10 - 2) + 2),
  },
};
</script>
