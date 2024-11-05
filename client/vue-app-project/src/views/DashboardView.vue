<template>
  <DashboardLayout>
    <h1
      class="text-slate-800 font-lighter text-2xl italic underline-offset-4 underline">
      Summary Report
    </h1>
    <div class="mt-4">
      <SummaryTable />
    </div>
  </DashboardLayout>
</template>

<script>
import SummaryTable from '../components/elements/SummaryTable.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

export default {
  data() {
    return {};
  },
  name: 'DashboardView',
  components: {
    SummaryTable,
    DashboardLayout,
  },
};
</script>

<style scoped></style>
