import _ from 'lodash';
import axios from 'axios';

export default {
  state: {
    /**
     *  exampleHashedId: {
          isOwner: Boolean,
          nickname: String,
          role: String,
          title: String,
          text: String,
          votes: { likes: Number, laughs: Number },
          expiresIn: Number,
          commentsCount: Number,
          comments: []
     },
     */
     hash1234: {
      isOwner: true,
      nickname: 'mahjongcat',
      title: 'This is a test',
      role: 'Software Engineer [m]',
      text: 'I\'m a test post that can go on and on and on and on I\'m a test post that can go on and on and on and on I\'m a test post that can go on and on and on and on',
      votes: { likes: 2, laughs: 0, dislikes: 1 },
      expiresIn: 10,
      commentsCount: 1,
      comments: []
     },
     hash2345: {
      isOwner: false,
      nickname: 'mahjongcat2',
      role: 'QA Engineer [ic]',
      title: '',
      text: 'I\'m a test post that can go on and on and on and on',
      votes: { likes: 0, laughs: 1, dislikes: 4 },
      expiresIn: 10000,
      commentsCount: 0,
      comments: []
     },
  },
  
  getters: {
    post: state => postId => { return state[postId]; },

    allPosts(state) {
      const ownedPosts = [];
      const otherPosts = [];

      _.forOwn(state, (post, key) => {
        post.postId = key;

        if (post.isOwner) {
          post.postId = key;
          ownedPosts.push(post);
        } else {
          otherPosts.push(post);
        }
      });

      return { ownedPosts, otherPosts };
    },
  },

  mutations: {},

  actions: {},
};
