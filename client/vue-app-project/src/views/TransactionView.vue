<template>
  <div class="container">
    <TransactionForm />
  </div>
</template>

<script>
import TransactionForm from '../components/TransactionForm.vue';
export default { components: { TransactionForm } };
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
}
</style>
