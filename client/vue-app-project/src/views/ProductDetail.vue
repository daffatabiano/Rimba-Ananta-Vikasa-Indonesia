<template>
  <Toaster :message="message" :notify="notify" />
  <div class="flex justify-center min-h-screen items-center w-full h-full">
    <div
      class="w-1/4 flex flex-col justify-between h-full min-h-96 bg-slate-300 rounded-lg p-4 drop-shadow-lg m-auto text-center">
      <div>
        <h1 class="font-bold text-2xl mb-2 uppercase italic">
          {{ products.name }}
        </h1>
        <p class="font-light text-lg text-slate-400 mb-4">
          {{ products.productCode }}
        </p>
        <label for="price">Price</label>
        <input
          type="text"
          disabled
          class="w-full p-2 rounded-lg mb-2 bg-white cursor-not-allowed"
          :value="products.price" />
        <label for="quantity">Quantity</label>
        <input
          type="text"
          disabled
          class="w-full p-2 rounded-lg mb-2 bg-white cursor-not-allowed"
          :value="products.quantity" />
      </div>
      <div class="flex flex-col gap-1">
        <div class="flex gap-2">
          <button
            type="button"
            class="bg-slate-400 px-4 py-2 w-full rounded-lg"
            @click="this.$router.push('/product')">
            Back
          </button>
          <button
            type="button"
            class="bg-rose-600 text-white px-4 py-2 w-full rounded-lg"
            @click="moveToTrash">
            Move To Trash
          </button>
        </div>
        <button
          type="button"
          @click="handleDelete"
          class="bg-red-700 text-white px-4 py-2 w-full rounded-lg">
          Delete Permanent
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CardDetails from '../components/elements/CardDetails.vue';
import Toaster from '../components/elements/Toaster.vue';
export default {
  name: 'ProductDetail',
  components: {
    CardDetails,
    Toaster,
  },
  data() {
    return {
      products: {},

      id: this.$route.params.id,

      notify: false,
      message: '',
    };
  },
  async mounted() {
    await this.getProduct();
  },
  methods: {
    async getProduct() {
      const { id } = this.$route.params;
      const response = await fetch(
        `http://localhost:3000/api/v1/product/${id}`,
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
      this.products = data.data;

      console.log(data);
    },
    async moveToTrash() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/product-archieved/${this.id}`,
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
          this.$router.push('/product');
        }, 3000);
      } catch (error) {
        this.notify = true;
        this.message = error.message;
        setTimeout(() => {
          this.notify = false;
          this.$router.push('/product');
        }, 3000);
      }
    },
    async handleDelete() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/delete-product/${this.id}`,
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
          this.$router.push('/product');
        }, 2000);
      } catch (err) {
        this.notify = true;
        this.message = err.message;
        setTimeout(() => {
          this.notify = false;
        }, 2000);
      }
    },
  },
};
</script>
