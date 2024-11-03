<template>
  <HeadersDashboard />
  <SidebarDashboard />
  <div class="ps-52 pt-28 pe-4">
    <TrashTable />
  </div>
</template>

<script>
import TrashTable from '../components/elements/TrashTable.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';

export default {
  name: 'TrashView',
  components: {
    TrashTable,
    HeadersDashboard,
    SidebarDashboard,
  },
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
