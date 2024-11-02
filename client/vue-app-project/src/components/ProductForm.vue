<template>
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
      <button
        class="p-2 rounded-lg text-center bg-slate-300 font-bold text-slate-800"
        type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      price: 0,
      quantity: 0,
    };
  },

  methods: {
    async handleProduct() {
      console.log(this.name, this.price, this.quantity);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/products`,
          {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
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
          console.log(data);
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
