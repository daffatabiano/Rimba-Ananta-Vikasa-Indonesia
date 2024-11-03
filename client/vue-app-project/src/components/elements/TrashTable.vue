<template>
  <table class="w-full border border-slate-700 border-collapse">
    <thead class="bg-slate-700 text-white text-center">
      <tr class="border-collapse border-white">
        <th class="border border-collapse">Customer</th>
        <th class="border border-collapse">Invoice No</th>
        <th class="border border-collapse">Date</th>
        <th class="border border-collapse">Action</th>
      </tr>
    </thead>
    <tbody class="bg-slate-700 text-white text-center">
      <tr
        v-if="this.transactions.length > 0"
        class="border-collapse odd:slate-300 even:slate-200"
        v-for="transaction in transactions"
        :key="transaction._id">
        <td class="p-3 border border-collapse">{{ transaction.customer }}</td>
        <td class="border border-collapse">{{ transaction.invoiceNo }}</td>
        <td class="border border-collapse">
          {{ transaction.date.slice(0, 10).split('-').reverse().join('/') }}
        </td>
        <td class="border border-collapse">
          <button
            type="button"
            @click="handleRestored(transaction._id)"
            class="px-2 py-1 bg-blue-600 rounded-lg">
            Restore
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
</template>

<script>
export default {
  name: 'TrashTable',
  data() {
    return {
      transactions: [],
    };
  },

  async mounted() {
    await this.getTransactions();
  },

  methods: {
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
    async handleRestored(id) {
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
  },
};
</script>
