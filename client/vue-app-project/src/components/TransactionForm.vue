<template>
  <Toaster :message="message" :notify="notify" />
  <div class="flex flex-col bg-white p-4 drop-shadow rounded-lg">
    <h1 class="text-2xl font-bold">Transaction</h1>
    <form
      class="flex flex-col gap-4"
      action="handleTransaction"
      @submit.prevent="handleTransaction">
      <div class="flex flex-col gap-2">
        <label for="invoiceNo" class="text-lg font-semibold text-slate-800"
          >Invoice Number</label
        >
        <input
          :loading="loading"
          :disabled="loading"
          class="p-2 rounded-lg bg-slate-200 focus:outline-none"
          type="text"
          v-model="invoiceNo"
          required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer" class="text-lg font-semibold text-slate-800"
          >Date</label
        >
        <input
          :loading="loading"
          :disabled="loading"
          class="p-2 rounded-lg bg-slate-200 focus:outline-none"
          type="date"
          v-model="date"
          required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer" class="text-lg font-semibold text-slate-800"
          >Customer</label
        >
        <input
          :loading="loading"
          :disabled="loading"
          class="p-2 rounded-lg bg-slate-200 focus:outline-none"
          type="text"
          v-model="customer"
          required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="product" class="text-lg font-semibold text-slate-800"
          >Product:</label
        >
        <select
          :loading="loading"
          :disabled="loading"
          class="p-2 rounded-lg bg-slate-200 focus:outline-none"
          v-model="selectedProducts"
          multiple>
          <option
            v-for="product in dataProducts"
            :key="product._id"
            :value="{
              productCode: product.productCode,
              quantity: product.quantity,
            }">
            {{ product.name }}
          </option>
        </select>
      </div>
      <button
        :loading="loading"
        :disabled="loading"
        type="submit"
        class="p-2 rounded-lg bg-slate-800 w-full text-white">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import Toaster from '../components/elements/Toaster.vue';
export default {
  name: 'TransactionForm',
  data() {
    return {
      invoiceNo: '',
      date: '',
      amount: '',
      customer: '',
      selectedProducts: [],
      dataProducts: [],

      notify: false,
      message: '',
      loading: false,
    };
  },
  components: {
    Toaster,
  },
  mounted() {
    this.getProducts();
    this.getTransactions();
  },
  methods: {
    getQuantity(qty) {
      return qty;
    },

    async handleTransaction() {
      const transaction = {
        invoiceNo: this.invoiceNo,
        date: this.date,
        amount: this.amount,
        customer: this.customer,
        products: this.selectedProducts,
      };
      try {
        this.loading = true;
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify(transaction),
          }
        );
        const data = await response.json();
        console.log(response.status);
        if (response.status === 201) {
          this.loading = false;
          this.message = 'Transaction Created Successfully';
          this.notify = true;
          setTimeout(() => {
            window.location.reload(true);
          }, 500);
        }
      } catch (error) {
        this.loading = false;
        this.message = 'All fields are required';
        this.notify = true;
        setTimeout(() => {
          this.notify = false;
        }, 2000);
      }
    },

    async getProducts() {
      try {
        const response = await fetch(
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
        const data = await response.json();
        this.dataProducts = data.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getTransactions() {
      try {
        const response = await fetch(
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
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
