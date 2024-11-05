<template>
  <Toaster :message="message" :notify="notify" />
  <div class="bg-slate-100 h-full min-h-96 p-4 rounded-lg flex flex-col">
    <h1 class="text-2xl font-bold mb-6">Product Create</h1>
    <form
      class="flex flex-col gap-4"
      action="handleProduct"
      @submit.prevent="handleProduct">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-lg font-semibold text-slate-600"
          >Name</label
        >
        <input class="p-2 rounded-lg" type="text" v-model="name" required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="price" class="text-lg font-semibold text-slate-600"
          >Price</label
        >
        <input type="number" v-model="price" required class="p-2 rounded-lg" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="quantity" class="text-lg font-semibold text-slate-600"
          >Quantity</label
        >
        <input
          type="number"
          v-model="quantity"
          required
          class="p-2 rounded-lg" />
      </div>
      <div class="flex gap-1">
        <button
          class="p-2 rounded-lg w-[90%] text-center bg-slate-300 font-bold text-slate-800"
          type="submit">
          Submit
        </button>
        <button class="p-2 rounded-lg w-[10%]" type="reset">🔃</button>
      </div>
    </form>
  </div>
</template>

<script>
import Toaster from '../components/elements/Toaster.vue';
export default {
  data() {
    return {
      name: '',
      price: 0,
      quantity: 0,

      notify: false,
      message: '',
    };
  },
  components: {
    Toaster,
  },
  props: {
    $refs: {
      productTable: Object,
    },
  },
  async mounted() {
    this.getProducts();
  },

  methods: {
    async handleProduct() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/products`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify({
              name: this.name,
              price: this.price,
              quantity: this.quantity,
            }),
          }
        );

        if (response.status === 201) {
          const data = await response.json();
          this.notify = true;
          this.message = 'Product Created Successfully';
          setTimeout(() => {
            window.location.reload(true);
          }, 500);
        } else {
          const errorData = await response.json();
          this.notify = true;
          this.message = errorData.message;
        }
      } catch (error) {
        this.notify = true;
        this.message = 'Something went wrong';
      }
    },
  },
};
</script>
