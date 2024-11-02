<template>
  <div>
    <table class="w-full border border-slate-700 border-collapse">
      <thead class="bg-slate-700 text-white text-center">
        <tr class="border-collapse border-white">
          <th class="border border-collapse">Customer</th>
          <th class="border border-collapse">Invoice No</th>
          <th colspan="2" class="border border-collapse">Product Code</th>
          <th class="border border-collapse">Date</th>
        </tr>
      </thead>
      <tbody
        v-if="this.summaries.length > 0"
        class="overflow-auto border-collapse max-h-96 h-full">
        <tr
          class="even:bg-slate-200 odd:bg-slate-300 border border-collapse"
          v-for="summary in summaries"
          :key="summary._id">
          <td class="p-2 border border-collapse">{{ summary.customer }}</td>
          <td class="p-2 border border-collapse">{{ summary.invoiceNo }}</td>
          <td
            class="p-2 border border-collapse"
            v-for="product in summary.products"
            :key="product._id">
            {{ product.productCode }}
          </td>
          <td class="p-2 border border-collapse">
            {{ summary.date.slice(0, 10).split('-').reverse().join('/') }}
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6" class="text-center p-2">
            No data available
            <a href="/transaction" class="text-slate-800 font-bold italic"
              >Input data</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      summaries: [],
    };
  },
  mounted() {
    this.getSummary();
  },
  methods: {
    async getSummary() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions/summary`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();
        this.summaries = data.data;
        console.log(this.summaries, 'data');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
