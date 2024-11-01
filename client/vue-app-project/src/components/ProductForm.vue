<template>
  <div class="product-form">
    <h1>Product Create</h1>
    <form action="handleProduct" @submit.prevent="handleProduct">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="price">Price</label>
        <input type="number" v-model="price" required />
      </div>
      <div>
        <label for="quantity">Quantity"</label>
        <input type="number" v-model="quantity" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>

  <div class="product-list">
    <h2>Product List</h2>
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      price: 0,
      quantity: 0,

      products: [],
    };
  },

  async mounted() {
    try {
      await this.getProducts();
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async handleProduct() {
      console.log(this.name, this.price, this.quantity);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/products`,
          {
            method: 'POST',
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
        if (response.status === 200) {
          const data = await response.json();
          this.products = data.data;
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

<style>
.product-form {
  max-width: 300px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.product-form h1 {
  text-align: center;
}
.product-form div {
  margin-bottom: 1rem;
}
.product-form label {
  display: block;
}
.product-form input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
.product-form button {
  width: 100%;
  padding: 0.5rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
