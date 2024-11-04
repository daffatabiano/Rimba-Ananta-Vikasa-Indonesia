<template>
  <div class="flex justify-center items-center h-screen">
    <ModalDelete :handleDelete="submitDelete" />
  </div>
</template>

<script>
import ModalDelete from '../components/elements/ModalDelete.vue';
export default {
  name: 'DeleteProductView',
  components: {
    ModalDelete,
  },
  data() {
    return {
      id: this.$route.params.id,
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
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
