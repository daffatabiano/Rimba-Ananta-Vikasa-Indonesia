<template>
  <div>
    <HeadersDashboard />
    <SidebarDashboard />
    <div class="ps-52 pt-24">
      <TransactionForm />
    </div>
  </div>
</template>

<script>
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';
import TransactionForm from '../components/TransactionForm.vue';
export default {
  components: { TransactionForm, HeadersDashboard, SidebarDashboard },
};
</script>
