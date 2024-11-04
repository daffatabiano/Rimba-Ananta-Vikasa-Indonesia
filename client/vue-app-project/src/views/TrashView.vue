<template>
  <DashboardLayout>
    <TrashTable />
  </DashboardLayout>
</template>

<script>
import TrashTable from '../components/elements/TrashTable.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

export default {
  name: 'TrashView',
  components: {
    TrashTable,
    DashboardLayout,
  },
};
</script>
