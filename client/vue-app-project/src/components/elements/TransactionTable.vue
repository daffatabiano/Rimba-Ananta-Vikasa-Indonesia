<template>
  <table class="w-full border border-slate-700 border-collapse">
    <thead class="bg-slate-700 text-white text-center">
      <tr class="border-collapse border-white">
        <th class="border border-collapse">Customer</th>
        <th class="border border-collapse">Invoice No</th>
        <th colspan="2" class="border border-collapse">Product Code</th>
        <th class="border border-collapse">Date</th>
        <th class="border border-collapse">action</th>
      </tr>
    </thead>
    <tbody
      v-if="this.transactions.length > 0"
      class="overflow-auto border-collapse max-h-96 h-full">
      <tr
        class="even:bg-slate-200 odd:bg-slate-300 border border-collapse"
        v-for="transaction in transactions"
        :key="summary._id">
        <td class="p-2 border border-collapse">{{ transaction.customer }}</td>
        <td class="p-2 border border-collapse">{{ transaction.invoiceNo }}</td>
        <td
          class="p-2 border border-collapse"
          v-for="product in transaction.products"
          :key="transaction._id">
          {{ product.productCode }}
        </td>
        <td class="p-2 border border-collapse">
          {{ transaction.date.slice(0, 10).split('-').reverse().join('/') }}
        </td>
        <td class="p-2 border border-collapse">
          <button
            @click="this.$router.push(`/transaction/${transaction._id}`)"
            type="button"
            class="px-2 py-1 bg-red-600 text-white rounded-lg">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="6" class="text-center p-2">
          No data available
          <a href="/product" class="text-slate-800 font-bold italic"
            >Input data</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TransactionTable',
  data() {
    return {
      transactions: [],
    };
  },
  mounted() {
    this.getTransactions();
  },
  methods: {
    async getTransactions() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions`,
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
        this.transactions = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
