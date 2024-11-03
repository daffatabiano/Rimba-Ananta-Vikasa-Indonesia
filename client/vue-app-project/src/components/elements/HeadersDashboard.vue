<template>
  <nav class="bg-slate-800 p-4 fixed top-0 left-0 z-50 h-24 w-full">
    <div class="flex justify-between items-center text-white">
      <h1 class="text-2xl font-bold ps-52">Dashboard Control</h1>

      <div class="flex flex-col space-y-1">
        <p class="capitalize">{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
  },
};
</script>
