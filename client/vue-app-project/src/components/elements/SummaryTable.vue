<template>
  <div class="flex flex-col gap-2">
    <div>
      <h1 class="font-bold text-2xl">Transactions History</h1>
      <ReusableTable
        :datas="this.summaries.transactions"
        :headers="headersTransactions" />
    </div>
    <div>
      <h1 class="font-bold text-2xl">Products History</h1>
      <ReusableTable
        :datas="this.summaries.products"
        :headers="headersProducts" />
    </div>
    <div>
      <h1 class="font-bold text-2xl">Activity History</h1>
      <ReusableTable :datas="this.activity" :headers="headersActivity" />
    </div>
  </div>
</template>

<script>
import ReusableTable from './ReusableTable.vue';
export default {
  data() {
    return {
      summaries: [],
      activity: [],

      headersTransactions: ['Customer', 'Invoice No', 'Product Code', 'Date'],
      headersProducts: ['Product Code', 'Name', 'Price', 'Quantity'],
      headersActivity: ['Title', 'Action', 'Timestamp', 'User'],
    };
  },
  components: {
    ReusableTable,
  },

  mounted() {
    this.getSummary();
    this.getActivity();
  },
  methods: {
    async getActivity() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/activity`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();

        this.activity = data.data;
      } catch (error) {
        console.log(error);
      }
    },

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
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
