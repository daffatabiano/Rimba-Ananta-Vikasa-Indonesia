<template>
  <div class="w-full overflow-hidden">
    <h2 class="text-2xl font-bold italic">Product List</h2>
    <div class="overflow-y-auto max-h-[80vh] pb-16">
      <table class="w-full border border-collapse">
        <thead class="bg-slate-700 text-white sticky top-0">
          <tr class="border-collapse border-white">
            <th class="border border-collapse">Name</th>
            <th class="border border-collapse">Price</th>
            <th class="border border-collapse">Quantity</th>
            <th class="border border-collapse">Action</th>
          </tr>
        </thead>
        <tbody class="bg-slate-200">
          <tr
            v-if="products.length !== 0"
            class="border-collapse odd:bg-slate-300 even:bg-slate-200"
            v-for="product in products"
            :key="product._id">
            <td class="border border-collapse p-2">{{ product.name }}</td>
            <td class="border border-collapse">
              {{
                Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(product.price)
              }}
            </td>
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
            <td colspan="4">No product found</td>
          </tr>
        </tbody>
      </table>
    </div>
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
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();

        this.products = data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
