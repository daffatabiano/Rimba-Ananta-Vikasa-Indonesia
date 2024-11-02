<template>
  <div>
    <HeadersDashboard />
    <SidebarDashboard />
    <div
      class="ps-52 pt-24 text-slate-800 font-lighter text-2xl italic underline-offset-4 underline">
      Summary Report
    </div>
  </div>
</template>

<script>
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';

export default {
  name: 'DashboardView',
  components: { HeadersDashboard, SidebarDashboard },
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
