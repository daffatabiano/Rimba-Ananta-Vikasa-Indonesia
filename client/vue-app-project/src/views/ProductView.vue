<template>
  <div class="product-view">
    <ProductForm />
  </div>
</template>

<script>
import ProductForm from '../components/productForm.vue';

export default {
  components: {
    ProductForm,
  },
};
</script>

<style>
.product-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
}
</style>
