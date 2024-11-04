<template>
  <ModalDelete :handleDelete="handleDelete" />
</template>

<script>
import ModalDelete from '../components/elements/ModalDelete.vue';

export default {
  name: 'DeleteView',
  components: { ModalDelete },
  data() {
    return {};
  },
  methods: {
    async handleDelete() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transaction/${
            this.$route.params.id
          }`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );

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
