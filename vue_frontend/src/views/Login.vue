<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email" required />
      </div>
      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import { login } from '../services/auth';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        await login({ email: this.email, password: this.password });
        this.$router.push('/posts');
      } catch (error) {
        alert('Login failed');
      }
    }
  }
};
</script>
