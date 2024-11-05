<template>
  <Toaster :message="message" :notify="notify" />
  <ModalContent :visible="visible" @close="visible = false">
    <div class="flex flex-col">
      <p class="text-red-500 my-4 font-bold">
        Are you sure you want to clear history?
      </p>
      <div class="flex gap-2 justify-end mt-2">
        <button
          type="button"
          @click="visible = false"
          class="py-1 px-2 bg-red-600 rounded-lg text-white">
          No
        </button>
        <button
          type="button"
          @click="clearActivity"
          class="py-1 px-2 bg-emerald-600 rounded-lg text-white">
          Yes
        </button>
      </div>
    </div>
  </ModalContent>

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
      <h1 class="font-bold text-2xl flex justify-between">
        Activity History
        <span
          type="button"
          @click="visible = true"
          class="bg-blue-500 text-lg mb-2 cursor-pointer text-white font-normal px-2 py-1 rounded-lg"
          >clear</span
        >
      </h1>
      <ReusableTable :datas="this.activity" :headers="headersActivity" />
    </div>
  </div>
</template>

<script>
import ReusableTable from './ReusableTable.vue';
import ModalContent from './Modals/ModalContent.vue';
import Toaster from './Toaster.vue';

export default {
  data() {
    return {
      summaries: [],
      activity: [],
      visible: false,

      headersTransactions: ['Customer', 'Invoice No', 'Product Code', 'Date'],
      headersProducts: ['Product Code', 'Name', 'Price', 'Quantity'],
      headersActivity: ['Title', 'Action', 'Timestamp', 'Details'],

      notify: false,
      message: '',
    };
  },
  components: {
    ReusableTable,
    ModalContent,
    Toaster,
  },

  mounted() {
    this.getSummary();
    this.getActivity();
  },
  methods: {
    async clearActivity() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/all-activities`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();
        this.notify = true;
        this.message = data.message;
        setTimeout(() => {
          this.notify = false;
          this.visible = false;
          window.location.reload(true);
        }, 3000);
      } catch (err) {
        this.notify = true;
        this.message = err.message;
        setTimeout(() => {
          this.notify = false;
        }, 3000);
      }
    },

    async getActivity() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/activities`,
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
