<template>
  <div class="flex justify-center items-center w-full h-full">
    <div
      class="w-1/2 h-full bg-white rounded-lg p-4 drop-shadow m-auto text-center">
      <h1 class="font-bold text-2xl mb-2">{{ products.name }}</h1>
      <p class="font-light text-lg text-slate-400 mb-4">
        {{ products.productCode }}
      </p>

      <input
        type="text"
        disabled
        class="w-full p-2 rounded-lg mb-2"
        :value="products.price" />

      <input
        type="text"
        disabled
        class="w-full p-2 rounded-lg mb-2"
        :value="products.quantity" />

      <button
        class="bg-slate-400 text-white px-4 py-2 w-full rounded-lg"
        @click="this.$router.push('/product')">
        Back
      </button>
    </div>
  </div>
</template>

<script>
import CardDetails from '../components/elements/CardDetails.vue';
export default {
  name: 'ProductDetail',
  components: {
    CardDetails,
  },
  data() {
    return {
      products: {},
    };
  },
  async mounted() {
    await this.getProduct();
  },
  methods: {
    async getProduct() {
      const { id } = this.$route.params;
      const response = await fetch(
        `http://localhost:3000/api/v1/product/${id}`,
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
      this.products = data.data;

      console.log(data);
    },
  },
};
</script>
