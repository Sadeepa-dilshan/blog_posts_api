<template>
  <div class="container mt-5">
    <h2>Register</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <input v-model="name" type="text" class="form-control" placeholder="Name" required />
      </div>
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email" required />
      </div>
      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required />
      </div>
      <div class="mb-3">
        <input v-model="confirmPassword" type="password" class="form-control" placeholder="Confirm Password" required />
      </div>
      <p v-if="passwordMismatch" class="text-danger">Passwords do not match</p>
      <button type="submit" class="btn btn-primary" :disabled="passwordMismatch">Register</button>
    </form>
  </div>
</template>

<script>
import { register } from '../services/auth';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  computed: {
    passwordMismatch() {
      return this.password !== this.confirmPassword;
    }
  },
  methods: {
    async submitForm() {
      if (!this.passwordMismatch) {
        try {
          await register({ name: this.name, email: this.email, password: this.password });
          this.$router.push('/login'); // Navigate to login page after successful registration
        } catch (error) {
          alert('Registration failed');
        }
      }
    }
  }
};
</script>
