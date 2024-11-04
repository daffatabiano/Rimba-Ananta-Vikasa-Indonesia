<template>
  <!-- Transaction table trash -->
  <div>
    <h1 class="font-bold text-2xl">Transactions Table</h1>
    <table class="w-full border border-slate-700 border-collapse">
      <thead class="bg-slate-700 text-white text-center">
        <tr class="border-collapse border-white">
          <th class="border border-collapse">Customer</th>
          <th class="border border-collapse">Invoice No</th>
          <th class="border border-collapse">Date</th>
          <th class="border border-collapse">Action</th>
        </tr>
      </thead>
      <tbody
        class="bg-slate-700 odd:slate-300 even:slate-200 text-white text-center">
        <tr
          v-if="this.transactions.length > 0"
          class="border-collapse"
          v-for="transaction in transactions"
          :key="transaction._id">
          <td class="p-3 border border-collapse">{{ transaction.customer }}</td>
          <td class="border border-collapse">{{ transaction.invoiceNo }}</td>
          <td class="border border-collapse">
            {{ transaction.date.slice(0, 10).split('-').reverse().join('/') }}
          </td>
          <td class="border border-collapse flex justify-center gap-2 p-2">
            <button
              type="button"
              @click="handleRestoredTransaction(transaction._id)"
              class="px-2 py-1 bg-blue-600 rounded-lg text-white">
              Restore
            </button>
            <button
              type="button"
              @click="this.$router.push(`/delete-product/${transaction._id}`)"
              class="px-2 py-1 bg-red-600 rounded-lg text-white">
              Delete
            </button>
          </td>
        </tr>
        <tr v-else>
          <td colspan="4" class="text-center p-2">
            No data Deleted
            <a href="/transaction" class="text-red-600 font-bold italic"
              >Deleted data</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- End Transaction table -->

  <!-- Product table trash  -->
  <div>
    <h1 class="font-bold text-2xl">Product Table</h1>

    <table class="w-full border border-slate-700 border-collapse">
      <thead class="bg-slate-700 text-white text-center">
        <tr class="border-collapse border-white">
          <th class="border border-collapse">Product Code</th>
          <th class="border border-collapse">Name</th>
          <th class="border border-collapse">Price</th>
          <th class="border border-collapse">Quantity</th>
          <th class="border border-collapse">Action</th>
        </tr>
      </thead>
      <tbody class="bg-slate-700 text-white text-center">
        <tr
          v-if="this.transactions.length > 0"
          class="border-collapse odd:slate-300 even:slate-200"
          v-for="product in products"
          :key="product._id">
          <td class="p-3 border border-collapse">{{ product.productCode }}</td>
          <td class="border border-collapse">{{ product.name }}</td>
          <td class="border border-collapse">
            {{
              Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(product.price)
            }}
          </td>
          <td class="border border-collapse">
            {{ product.quantity }}
          </td>
          <td class="border border-collapse flex justify-center gap-2 p-2">
            <button
              type="button"
              @click="handleRestoredProduct(product._id)"
              class="px-2 py-1 bg-blue-600 rounded-lg text-white">
              Restore
            </button>
            <button
              type="button"
              @click="this.$router.push(`/delete-product/${product._id}`)"
              class="px-2 py-1 bg-red-600 rounded-lg text-white">
              Delete
            </button>
          </td>
        </tr>
        <tr v-else>
          <td colspan="4" class="text-center p-2">
            No data Deleted
            <a href="/product" class="text-red-600 font-bold italic"
              >Deleted data</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- End Product table trash  -->
</template>

<script>
export default {
  name: 'TrashTable',
  data() {
    return {
      transactions: [],
      products: [],
    };
  },

  async mounted() {
    await this.getTransactions();
    await this.getProducts();
  },

  methods: {
    // transactions method function
    async getTransactions() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/archieved`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();
        this.transactions = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handleRestoredTransaction(id) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions/${id}/restore`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        if (res.status === 200) {
          await this.getTransactions();
          this.notify = true;
          this.message = 'Transaction Restored';
        } else {
          this.notify = true;
          this.message = 'Cannot Restore Transaction';
        }
      } catch (error) {
        this.notify = true;
        this.message = error.message;
      }
    },

    // products method function
    async getProducts() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/products/get-archieved`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();
        this.products = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handleRestoredProduct(id) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/product/${id}/restored`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        if (res.status === 200) {
          await this.getProducts();
          this.notify = true;
          this.message = 'Product Restored';
        } else {
          this.notify = true;
          this.message = 'Cannot Restore Product';
        }
      } catch (error) {
        this.notify = true;
        this.message = error.message;
      }
    },
  },
};
</script>
