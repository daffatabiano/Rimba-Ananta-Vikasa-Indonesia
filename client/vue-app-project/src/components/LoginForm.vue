<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          const token = `Bearer ${data?.data?.accessToken}`;
          localStorage.setItem('token', token);
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        } else {
          const errorData = await response.json();
          alert(errorData.error);
        }
        this.$emit('login', {
          email: this.email,
          password: this.password,
          token: localStorage.getItem('token'),
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
