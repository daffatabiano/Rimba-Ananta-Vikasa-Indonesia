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
          v-model="name"
          required
          class="w-full p-2 focus:outline-none bg-slate-100 rounded-lg" />
      </div>
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
      <div>
        <label for="phoneNumber">Number Phone</label>
        <input
          type="number"
          v-model="phoneNumber"
          class="w-full p-2 focus:outline-none bg-slate-100 rounded-lg" />
      </div>

      <button
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
    };
  },
  methods: {
    async handleRegister() {
      try {
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
          setTimeout(() => {
            this.$router.push('/login');
          }, 1000);
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
