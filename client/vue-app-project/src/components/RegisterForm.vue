<template>
  <div class="bg-white p-4 rounded-lg drop-shadow">
    <h2 class="text-2xl font-bold">Register</h2>
    <p class="text-lg text-slate-400 mb-4 font-light italic">
      Please fill in this form to create an account.
    </p>
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
    <form action="handleRegister" @submit.prevent="handleRegister">
      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          :loading="loading"
          :disabled="loading"
          v-model="name"
          required
          class="w-full p-2 focus:outline-none bg-slate-100 rounded-lg" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          :loading="loading"
          :disabled="loading"
          type="email"
          v-model="email"
          required
          class="w-full p-2 focus:outline-none bg-slate-100 rounded-lg" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          :loading="loading"
          :disabled="loading"
          type="password"
          v-model="password"
          required
          class="w-full p-2 focus:outline-none bg-slate-100 rounded-lg" />
      </div>
      <div>
        <label for="phoneNumber">Number Phone</label>
        <input
          :loading="loading"
          :disabled="loading"
          type="number"
          v-model="phoneNumber"
          class="w-full p-2 focus:outline-none bg-slate-100 rounded-lg" />
      </div>

      <button
        :loading="loading"
        :disabled="loading"
        type="submit"
        class="bg-slate-200 mt-6 px-4 py-2 rounded-lg w-full">
        Sign Up
      </button>

      <p
        class="text-center mt-4 text-slate-400 font-light italic"
        @click="$router.push('/login')"
        role="button">
        Already have an account? Login
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',

      notify: false,
      message: '',

      loading: false,
    };
  },
  methods: {
    async handleRegister() {
      try {
        this.loading = true;
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password,
              phoneNumber: this.phoneNumber,
            }),
          }
        );
        if (response.status === 201) {
          await response.json();

          this.loading = false;
          this.notify = true;
          this.message = 'Register Success !';

          setTimeout(() => {
            this.$router.push('/login');

            this.notify = false;
            this.message = '';
          }, 1000);
        } else {
          this.loading = false;
          const errorData = await response.json();
          console.log(errorData.message);

          this.notify = true;
          this.message = errorData.message;

          setTimeout(() => {
            this.notify = false;
            this.message = '';
          }, 3000);
        }
      } catch (error) {
        this.loading = false;
        this.notify = true;
        this.message = error.message;

        setTimeout(() => {
          this.notify = false;
          this.message = '';
        }, 3000);
      }
    },
  },
};
</script>
