<template>
  <div>
    <HeadersDashboard />
    <SidebarDashboard />
    <div class="ps-52 pt-28 pe-4 flex gap-5">
      <TransactionForm />
      <TransactionTable />
    </div>
  </div>
</template>

<script>
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';
import TransactionTable from '../components/elements/TransactionTable.vue';
import TransactionForm from '../components/TransactionForm.vue';
export default {
  components: {
    TransactionForm,
    HeadersDashboard,
    SidebarDashboard,
    TransactionTable,
  },
};
</script>
