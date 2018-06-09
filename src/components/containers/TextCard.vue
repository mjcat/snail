<template lang="pug">
el-card.post(
  shadow="hover"
  :class="{ highlight: isOwner }"
)
  div(slot="header")
    template(v-if="isSummary")
      app-countdown.counter(:expiresIn="expiresIn")
    h1 {{ generatedTitle }}
    app-user-display(:nickname="nickname" :role="role")
    .description {{ generatedDesc }}
  div
    span.fa-stack.votes-left(v-if="likes > 0 || !isSummary")
      app-submit.fa.fa-thumbs-up.fa-stack-2x(
        v-if="!isSummary"
        action="saveVote"
        :param="{ postId, commentNumber, type: 'likes'}"
        successMessage="Thanks for voting!"
        errorMessage="Oops, something went wrong. Please try again."
      )
      i.fa.fa-thumbs-up.fa-stack-2x(v-else)
      strong.fa-stack-1x.icon-text {{ likes }}

    span.fa-stack.votes-left(v-if="laughs > 0 || !isSummary")
      app-submit.fa.fa-smile-o.fa-stack-2x(
        v-if="!isSummary"
        action="saveVote"
        :param="{ postId, commentNumber, type: 'laughs'}"
        successMessage="Thanks for voting!"
        errorMessage="Oops, something went wrong. Please try again."
      )
      i.fa.fa-smile-o.fa-stack-2x(v-else)
      strong.fa-stack-1x.icon-text {{ laughs }}

    span.fa-stack.votes-right(v-if="isSummary")
      i.fa.fa-comment.fa-stack-2x
      strong.fa-stack-1x.icon-text {{ comments }}

    span.fa-stack.votes-right(v-else)
      app-submit.fa.fa-thumbs-down.fa-stack-2x(
        v-if="!isSummary"
        action="saveVote"
        :param="{ postId, commentNumber, type: 'dislikes'}"
        successMessage="Thanks for voting!"
        errorMessage="Oops, something went wrong. Please try again."
      )
      i.fa.fa-thumbs-down.fa-stack-2x(v-else)
      strong.fa-stack-1x.icon-text {{ dislikes }}
</template>

<script>
import AppLink from '@/components/containers/Link';
import AppCountdown from '@/components/containers/Countdown';
import AppUserDisplay from '@/components/posts/UserDisplay';
import AppSubmit from '@/components/containers/Submit';

export default {
  components: { AppLink, AppCountdown, AppUserDisplay, AppSubmit },
  
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
    comments: {
      type: Number,
      default: 0,
    },
    isSummary: {
      type: Boolean,
      default: false,
    },
    expiresIn: {
      type: Number,
      required: false,
    },
    postId: String,
    commentNumber: Number,

  },

  data() {
    return {
      shortTitleLength: 60,
      shortDescLength: 500,
    };
  },

  computed: {
    generatedTitle() {
      if (this.isSummary) {
        let title = this.title;
        if (!title) {
          title = this.description;
        }

        return this.shorten(title, this.shortTitleLength);
      }

      return this.title;
    },

    generatedDesc() {
      if (this.isSummary) {
        return this.shorten(this.description, this.shortDescLength);
      }

      return this.description;
    },
  },

  methods: {
    shorten(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      }

      let shortText = text.substr(0, maxLength);

      return shortText.substr(0, Math.min(shortText.length, shortText.lastIndexOf(" "))) + '...';
    },
  },
};
</script>

<style lang="stylus" scoped>
@require '../../theme';

a
  color: #333333
  &:hover
    text-decoration: none
  
.post
  margin-bottom: $lg-margin
  &.highlight
    background-color: $brand-very-light

h1
  font-size: $md-font
  margin-bottom: $md-margin

.description
  font-size: $rg-font
  margin-top: $md-margin
  
.icon-text
  margin-left: $lg-margin

.votes-left
  margin-right: $xl-margin

.votes-right
  float: right
  margin-right: $lg-margin

.counter
  float: right
  margin-right: -($rg-margin)
  margin-top: -($md-margin)
  
</style>
