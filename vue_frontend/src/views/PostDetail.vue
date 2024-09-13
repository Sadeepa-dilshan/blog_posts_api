<template>
  <div class="container mt-5">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <router-link to="/posts" class="btn btn-secondary">Back to Posts</router-link>
  </div>
</template>

<script>
import { getPostById } from '../services/postService';

export default {
  data() {
    return {
      post: {}
    };
  },
  async created() {
    const postId = this.$route.params.id;
    try {
      const response = await getPostById(postId);
      this.post = response.data;
    } catch (error) {
      alert('Failed to fetch post');
    }
  }
};
</script>
