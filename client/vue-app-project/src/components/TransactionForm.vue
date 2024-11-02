<template>
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
        type="submit"
        class="p-2 rounded-lg bg-slate-800 w-full text-white">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
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
    };
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
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions`,
          {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify(transaction),
          }
        );
        const data = await response.json();
        console.log(transaction);
      } catch (error) {
        console.error(error);
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

<style>
.transaction-form {
  max-width: 300px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.transaction-form h1 {
  text-align: center;
}
.transaction-form div {
  margin-bottom: 1rem;
}
.transaction-form label {
  display: block;
}
.transaction-form input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
.transaction-form button {
  width: 100%;
  padding: 0.5rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
