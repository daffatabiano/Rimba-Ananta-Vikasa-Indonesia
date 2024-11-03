<template>
  <nav class="bg-slate-800 p-4 fixed top-0 left-0 z-50 w-full h-16">
    <div class="mx-auto flex items-center justify-between">
      <div class="text-white text-lg font-semibold">Rimba | WebDev.</div>
      <div class="hidden md:flex space-x-6 md:items-center">
        <a
          href="#"
          class="text-gray-300 hover:text-white transition duration-300"
          >Home</a
        >
        <a
          href="#"
          class="text-gray-300 hover:text-white transition duration-300"
          >About</a
        >
        <a
          href="#"
          class="text-gray-300 hover:text-white transition duration-300"
          >Services</a
        >
        <a
          href="/login"
          class="bg-gray-300 px-4 py-2 rounded-lg text-gray-800 hover:text-white transition duration-300"
          v-if="!isLoggedIn"
          >Login</a
        >
        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          type="button"
          class="bg-gray-300 px-4 py-2 rounded-lg text-gray-800 hover:text-white transition duration-300">
          logout
        </button>
      </div>
      <button
        @click="toggleMenu"
        class="md:hidden text-gray-300 focus:outline-none">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div
      :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
      class="md:hidden mt-8">
      <a
        href="#"
        class="block text-slate-800 hover:text-slate-400 transition duration-300 py-1"
        >Home</a
      >
      <a
        href="#"
        class="block text-slate-800 hover:text-slate-400 transition duration-300 py-1"
        >About</a
      >
      <a
        href="#"
        class="block text-slate-800 hover:text-slate-400 transition duration-300 py-1"
        >Services</a
      >
      <a
        href="#"
        class="block text-slate-800 hover:text-slate-400 transition duration-300 py-1"
        >Contact</a
      >
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,

      isLoggedIn: false,
    };
  },

  mounted() {
    this.checkAuth();
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn = true;
      }
    },

    handleLogout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      setTimeout(() => {
        this.$router.push('/login');
      }, 1000);
    },
  },
};
</script>

<style scoped>
/* Tambahkan style tambahan jika diperlukan */
</style>
