<template>
  <div class="text-red-500 font-bold">dashboard</div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      data: null,
    };
  },
  async mounted() {
    this.getSummary();
  },
  methods: {
    async getSummary() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions/summary`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
