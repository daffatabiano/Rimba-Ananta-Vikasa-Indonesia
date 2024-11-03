<template>
  <HeadersDashboard />
  <SidebarDashboard />
  <div class="ps-52 pt-28 pe-4">
    <TrashTable />
  </div>
</template>

<script>
import TrashTable from '../components/elements/TrashTable.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';

export default {
  name: 'TrashView',
  components: {
    TrashTable,
    HeadersDashboard,
    SidebarDashboard,
  },
};
</script>
