<template>
  <div class="register-form">
    <h2>Register</h2>
    <form action="handleRegister" @submit.prevent="handleRegister">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="phoneNumber">Number Phone</label>
        <input type="number" v-model="phoneNumber" />
      </div>

      <button type="submit">Sign Up</button>
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
          const data = await response.json();
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

<style>
.register-form {
  max-width: 300px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.register-form h2 {
  text-align: center;
}
.register-form div {
  margin-bottom: 1rem;
}
.register-form label {
  display: block;
}
.register-form input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
.register-form button {
  width: 100%;
  padding: 0.5rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
