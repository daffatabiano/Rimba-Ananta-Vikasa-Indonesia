<template>
  <DashboardLayout>
    <div class="flex gap-4">
      <TransactionForm />
      <TransactionTable />
    </div>
  </DashboardLayout>
</template>

<script>
import TransactionTable from '../components/elements/TransactionTable.vue';
import TransactionForm from '../components/TransactionForm.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
export default {
  components: {
    TransactionForm,
    TransactionTable,
    DashboardLayout,
  },
};
</script>
