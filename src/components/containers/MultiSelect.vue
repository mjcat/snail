<template lang="pug">
el-select(
  placeholder="Enter a few"
  :value="value"
  @change="update"
  remote
  :remote-method="getSuggestions"
  multiple filterable allow-create default-first-option
)
  el-option(v-for="suggestion in suggestions" :key="suggestion" :label="suggestion" :value="suggestion")
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  props: {
    value: {
      type: Array,
      default: [],
    },
    update: {
      type: Function,
      required: true,
    },
    getSuggestionsApi: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['token']),
  },
  data() {
    return {
      suggestions: [],
    };
  },
  methods: {
    async getSuggestions(input) {
      const res = await axios.get(`http://localhost:8081${this.getSuggestionsApi}`, {
        params: { input },
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (res.status === 200 && res.data) {
        this.suggestions = res.data.suggestions || [];
      }
    },
  },
  async created() {
    const res = await axios.get(`http://localhost:8081${this.getSuggestionsApi}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (res.status === 200 && res.data) {
      this.suggestions = res.data.suggestions || [];
    }
  },
};
</script>
