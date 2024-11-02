<template>
  <div>
    <HeadersDashboard />
    <SidebarDashboard />
    <div class="ps-52 pt-28 pe-4">
      <div class="flex gap-4 w-full h-full">
        <ProductForm />
        <ProductTabel />
      </div>
    </div>
  </div>
</template>

<script>
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';
import ProductTabel from '../components/elements/productTabel.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';
import ProductForm from '../components/ProductForm.vue';

export default {
  components: {
    ProductForm,
    HeadersDashboard,
    SidebarDashboard,
    ProductTabel,
  },
};
</script>
