<template>
  <div class="bg-white p-4 rounded-lg drop-shadow">
    <h2 class="text-2xl font-bold">Login</h2>
    <p class="text-xl text-slate-400 mb-4 text-balance font-light">
      Please login to continue,
    </p>
    <form @submit.prevent="handleLogin">
      <p
        v-if="notify"
        class="text-center p-2 rounded-lg font-semibold"
        :class="
          message.includes('Success')
            ? 'text-green-700 bg-green-200/60'
            : 'text-red-700 bg-red-200/60'
        ">
        {{ message }}
      </p>
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          v-model="email"
          required
          class="w-full p-2 focus:outline-none bg-slate-100 rounded-lg" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="password"
          required
          class="w-full p-2 focus:outline-none bg-slate-100 rounded-lg" />
      </div>
      <button
        type="submit"
        class="bg-slate-200 mt-6 px-4 py-2 rounded-lg w-full">
        Login
      </button>
      <p class="text-center mt-2 text-slate-500 text-sm">
        Don't have an account?
        <a href="/register" class="slate-800 font-semibold">Register</a>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',

      notify: false,
      message: '',

      loading: false,
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
              Origin: '*',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          }
        );
        this.loading = true;
        if (response.status === 200) {
          const data = await response.json();
          const token = `Bearer ${data?.data?.accessToken}`;
          localStorage.setItem('token', token);
          this.notify = true;
          this.message = 'Login Success !';
          this.loading = false;
          setTimeout(() => {
            localStorage.setItem('user', JSON.stringify(data?.data?.user));
            this.notify = false;
            this.message = '';
            this.$router.push('/');
          }, 1000);
        } else {
          const errorData = await response.json();
          this.loading = false;
          this.notify = true;
          this.message = errorData.message;
        }
        this.$emit('login', {
          email: this.email,
          password: this.password,
          token: localStorage.getItem('token'),
        });
      } catch (error) {
        this.loading = false;
        this.message = error.response.message;
      }
    },
  },
};
</script>
