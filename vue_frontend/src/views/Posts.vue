<template>
  <div class="container mt-5">
    <h2>Posts</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Form for Creating/Updating Post -->
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <input v-model="form.title" type="text" class="form-control" placeholder="Title" required />
      </div>
      <div class="mb-3">
        <textarea v-model="form.body" class="form-control" placeholder="Body" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Post' : 'Create Post' }}</button>
    </form>

    <!-- List of Posts -->
    <div class="row mt-4">
      <div class="col-md-4" v-for="post in posts" :key="post.id">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.body }}</p>
            <button @click="editPost(post)" class="btn btn-warning btn-sm">Edit</button>
            <button @click="deletePost(post.id)" class="btn btn-danger btn-sm">Delete</button>
            <router-link :to="'/posts/' + post.id" class="btn btn-info btn-sm">View</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPosts, createPost, updatePost, deletePost } from '../services/postService';

export default {
  data() {
    return {
      posts: [],
      form: {
        title: '',
        body: ''
      },
      error: null,
      isEditing: false,
      editingPostId: null
    };
  },
  async created() {
    await this.fetchPosts();
  },
  methods: {
    // Fetch all posts
    async fetchPosts() {
      try {
        const response = await getPosts();
        this.posts = response.data;
      } catch (error) {
        this.error = 'Failed to load posts';
      }
    },
    // Submit form (create or update post)
    async submitForm() {
      try {
        if (this.isEditing) {
          await updatePost(this.editingPostId, this.form); // Update the post
        } else {
          await createPost(this.form); // Create new post
        }
        this.resetForm();
        await this.fetchPosts(); // Refresh posts
      } catch (error) {
        this.error = 'Failed to save post';
      }
    },
    // Edit a post
    editPost(post) {
      this.isEditing = true;
      this.editingPostId = post.id;
      this.form.title = post.title;
      this.form.body = post.body;
    },
    // Delete a post
    async deletePost(id) {
      try {
        await deletePost(id);
        await this.fetchPosts(); // Refresh posts
      } catch (error) {
        this.error = 'Failed to delete post';
      }
    },
    // Reset form
    resetForm() {
      this.form.title = '';
      this.form.body = '';
      this.isEditing = false;
      this.editingPostId = null;
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
</style>
