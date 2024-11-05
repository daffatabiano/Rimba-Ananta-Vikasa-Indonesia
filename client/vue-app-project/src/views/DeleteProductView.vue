<template>
  <Toaster :message="message" :notify="notify" />
  <div class="flex justify-center items-center h-screen">
    <ModalDelete :handleDelete="submitDelete" />
  </div>
</template>

<script>
import ModalDelete from '../components/elements/ModalDelete.vue';
import Toaster from '../components/elements/Toaster.vue';
export default {
  name: 'DeleteProductView',
  components: {
    ModalDelete,
    Toaster,
  },
  data() {
    return {
      id: this.$route.params.id,

      notify: false,
      message: '',
    };
  },
  methods: {
    async submitDelete() {
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

        this.notify = true;
        this.message = 'Product Deleted';
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
