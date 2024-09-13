<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Idea8</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/posts">Posts</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <button @click="logout" class="btn btn-outline-danger">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { logout } from '../services/auth';

export default {
  data() {
    return {
      isAuthenticated: false
    };
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem('token');
  },
  methods: {
    async logout() {
      try {
        await logout();
        this.isAuthenticated = false;
        this.$router.push('/login');
      } catch (error) {
        alert('Logout failed');
      }
    }
  },
  watch: {
    $route() {
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  }
};
</script>

<style scoped>
.navbar-nav {
  margin-left: auto;  /* Right-align the nav links */
}
</style>
