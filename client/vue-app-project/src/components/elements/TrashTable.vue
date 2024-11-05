<template>
  <Toaster :message="message" :notify="notify" />
  <!-- Modal Transaction -->

  <!-- Modal Delete All -->
  <ModalContent
    :visible="visibleModalDeleteTransactions"
    @close="visibleModalDeleteTransactions = false">
    <h1 class="text-red-600 text-xl">
      Are you sure want delete all transactions?
    </h1>
    <div class="flex gap-2 justify-end mt-2">
      <button
        type="button"
        @click="visibleModalDeleteTransactions = false"
        class="py-1 px-2 bg-red-600 rounded-lg text-white">
        No
      </button>
      <button
        type="button"
        @click="handleDeleteTransactionAll"
        class="py-1 px-2 bg-emerald-600 rounded-lg text-white">
        Yes
      </button>
    </div>
  </ModalContent>

  <!-- Modal Restore All -->
  <ModalContent
    :visible="visibleModalRestoreTransactions"
    @close="visibleModalRestoreTransactions = false">
    <h1 class="text-emerald-600 text-xl">
      Are you sure want Restore all transactions?
    </h1>
    <div class="flex gap-2 justify-end mt-2">
      <button
        type="button"
        @click="visibleModalRestoreTransactions = false"
        class="py-1 px-2 bg-red-600 rounded-lg text-white">
        No
      </button>
      <button
        type="button"
        @click="handleRestoreTransactionAll"
        class="py-1 px-2 bg-emerald-600 rounded-lg text-white">
        Yes
      </button>
    </div>
  </ModalContent>

  <!-- Modal Transaction End -->

  <!-- Modal Product -->

  <!-- Modal Delete All -->
  <ModalContent
    :visible="visibleModalDeleteProducts"
    @close="visibleModalDeleteProducts = false">
    <h1 class="text-red-600 text-xl">Are you sure want delete all Products?</h1>
    <div class="flex gap-2 justify-end mt-2">
      <button
        type="button"
        @click="visibleModalDeleteProducts = false"
        class="py-1 px-2 bg-red-600 rounded-lg text-white">
        No
      </button>
      <button
        type="button"
        @click="handleRestoreProductAll"
        class="py-1 px-2 bg-emerald-600 rounded-lg text-white">
        Yes
      </button>
    </div>
  </ModalContent>

  <!-- Modal Restore All -->
  <ModalContent
    :visible="visibleModalRestoreProducts"
    @close="visibleModalRestoreProducts = false">
    <h1 class="text-emerald-600 text-xl">
      Are you sure want restore all products?
    </h1>
    <div class="flex gap-2 justify-end mt-2">
      <button
        type="button"
        @click="visibleModalRestoreProducts = false"
        class="py-1 px-2 bg-red-600 rounded-lg text-white">
        No
      </button>
      <button
        type="button"
        @click="handleRestoreProductAll"
        class="py-1 px-2 bg-emerald-600 rounded-lg text-white">
        Yes
      </button>
    </div>
  </ModalContent>

  <!-- Modal Product End -->

  <!-- Transaction table trash -->
  <div>
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-2xl">Transaction Trash</h1>
      <div class="flex gap-2">
        <div class="flex gap-2">
          <button
            type="button"
            @click="visibleModalRestoreTransactions = true"
            class="bg-transparent text-emerald-600 underline underline-offset-2">
            Restore All
          </button>
          <button
            type="button"
            @click="visibleModalDeleteTransactions = true"
            class="bg-transparent text-red-600 underline underline-offset-2">
            Delete All
          </button>
        </div>
      </div>
    </div>
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
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-2xl">Product Trash</h1>
      <div class="flex gap-2">
        <div class="flex gap-2">
          <button
            type="button"
            @click="visibleModalRestoreProducts = true"
            class="bg-transparent text-emerald-600 underline underline-offset-2">
            Restore All
          </button>
          <button
            type="button"
            @click="visibleModalDeleteProducts = true"
            class="bg-transparent text-red-600 underline underline-offset-2">
            Delete All
          </button>
        </div>
      </div>
    </div>

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
          v-if="this.products.length > 0"
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
          <td colspan="5" class="text-center p-2">
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
import ModalContent from './Modals/ModalContent.vue';
import Toaster from './Toaster.vue';
export default {
  name: 'TrashTable',
  components: {
    ModalContent,
    Toaster,
  },
  data() {
    return {
      transactions: [],
      products: [],

      notify: false,
      message: '',

      visibleModalDeleteTransactions: false,
      visibleModalRestoreTransactions: false,

      visibleModalDeleteProducts: false,
      visibleModalRestoreProducts: false,
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
          `${import.meta.env.VITE_BASE_API_URL}/get-archieved-transaction`,
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
        const data = await res.json();

        await this.getTransactions();
        this.notify = true;
        this.message = data.message;
        setTimeout(() => {
          this.notify = false;
        }, 1000);
        if (res.status === 200) {
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      } catch (error) {
        this.notify = true;
        this.message = error.message;
      }
    },
    async handleDeleteTransactionAll() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions/clear-archieve`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();
        this.notify = true;
        this.message = data.message;
        setTimeout(() => {
          this.notify = false;
        }, 1000);
        if (res.status === 200) {
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      } catch (error) {
        this.notify = true;
        this.message = error.message;
      }
    },
    async handleRestoreTransactionAll() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions/restore-all`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();
        this.notify = true;
        this.message = data.message;
        setTimeout(() => {
          this.notify = false;
        }, 1000);
        if (res.status === 200) {
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      } catch (err) {
        this.notify = true;
        this.message = err.message;
      }
    },

    // products method function
    async getProducts() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/products/get-archieved-product`,
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
        const data = await res.json();
        await this.getProducts();
        this.notify = true;
        this.message = data.message;
        setTimeout(() => {
          this.notify = false;
        }, 1000);
        if (res.status === 200) {
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      } catch (error) {
        this.notify = true;
        this.message = error.message;
      }
    },

    async handleDeleteProductAll() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/products/clear-archieve`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();
        this.notify = true;
        this.message = data.message;
        setTimeout(() => {
          this.notify = false;
        }, 1000);
        if (res.status === 200) {
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      } catch (error) {
        this.notify = true;
        this.message = error.message;
      }
    },
    async handleRestoreProductAll() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/products/restore-all`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        const data = await res.json();
        this.notify = true;
        this.message = data.message;
        setTimeout(() => {
          this.notify = false;
        }, 1000);
        if (res.status === 200) {
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      } catch (err) {
        this.notify = true;
        this.message = err.message;
      }
    },
  },
};
</script>
