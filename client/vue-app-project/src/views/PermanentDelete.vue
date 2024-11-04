<template>
  <ModalDelete :handleDelete="submitDelete" />
</template>

<script>
import ModalDelete from '../components/elements/ModalDelete.vue';
export default {
  name: 'PermanentDelete',
  components: { ModalDelete },
  methods: {
    async submitDelete() {
      const id = this.$route.params.id;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/delete-transaction/${id}`,
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
        if (res.status === 200) {
          this.$router.push('/trash');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
