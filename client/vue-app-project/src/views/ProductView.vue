<template>
  <DashboardLayout>
    <div class="flex gap-4 w-full h-full">
      <ProductForm />
      <ProductTabel />
    </div>
  </DashboardLayout>
</template>

<script>
import ProductTabel from '../components/elements/productTabel.vue';
import ProductForm from '../components/ProductForm.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

export default {
  components: {
    ProductForm,
    ProductTabel,
    DashboardLayout,
  },
  methods: {
    refreshProducts() {
      this.$refs.productTable.getProducts(); // Panggil metode getProducts di ProductTabel
    },
  },
};
</script>
