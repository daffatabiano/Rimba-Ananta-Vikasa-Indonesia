<template>
  <div>
    <HeadersDashboard />
    <SidebarDashboard />
    <ProductForm />
  </div>
</template>

<script>
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';
import ProductForm from '../components/productForm.vue';

export default {
  components: {
    ProductForm,
    HeadersDashboard,
    SidebarDashboard,
  },
};
</script>
