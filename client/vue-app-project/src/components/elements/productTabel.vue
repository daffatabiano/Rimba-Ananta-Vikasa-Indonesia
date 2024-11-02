<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold italic">Product List</h2>
    <table class="w-full border border-slate-700 border-collapse">
      <thead class="bg-slate-700 text-white">
        <tr class="border-collapse border-white">
          <th class="border border-collapse">Name</th>
          <th class="border border-collapse">Price</th>
          <th class="border border-collapse">Quantity</th>
          <th class="border border-collapse">Action</th>
        </tr>
      </thead>
      <tbody class="bg-slate-200 overflow-auto">
        <tr
          v-if="this.products.length !== 0"
          class="border-collapse odd:bg-slate-300 even:bg-slate-200"
          v-for="product in products"
          :key="product._id">
          <td class="border border-collapse p-2">{{ product.name }}</td>
          <td class="border border-collapse">{{ product.price }}</td>
          <td class="border border-collapse">{{ product.quantity }}</td>
          <td class="border border-collapse flex justify-center p-2">
            <button
              type="button"
              @click="$router.push(`/product/${product._id}`)"
              class="bg-sky-600 rounded-lg p-2 text-white">
              Details
            </button>
          </td>
        </tr>
        <tr v-else class="text-center">
          No product found
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  name: 'ProductTabel',
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/products`,
          {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        const data = await res.json();

        this.products = data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
