<template>
  <DashboardLayout>
    <h1
      class="text-slate-800 font-lighter text-2xl italic underline-offset-4 underline">
      Summary Report
    </h1>
    <div class="mt-4">
      <SummaryTable @show="showModal" />
    </div>
  </DashboardLayout>
</template>

<script>
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';
import SummaryTable from '../components/elements/SummaryTable.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

export default {
  data() {
    return {};
  },
  name: 'DashboardView',
  components: {
    HeadersDashboard,
    SidebarDashboard,
    SummaryTable,
    DashboardLayout,
  },
  methods: {
    showModal() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped></style>
