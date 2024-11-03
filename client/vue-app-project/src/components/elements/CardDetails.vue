<template>
  <div class="w-1/2 h-full bg-white rounded-lg p-4 drop-shadow m-auto">
    <h1>{{ product.name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'CardDetails',
  data() {
    return {
      product: {},
    };
  },
  async mounted() {
    await this.getProduct;
  },
  method: {
    async getProduct() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE.BASE_API_URL}/product/${
            this.$route.params.id
          }`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await response.json();
        console.log(data);
        this.product = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
