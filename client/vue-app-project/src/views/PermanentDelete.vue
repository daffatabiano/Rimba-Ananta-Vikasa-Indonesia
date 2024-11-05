<template>
  <Toaster :message="message" :notify="notify" />
  <ModalDelete :handleDelete="submitDelete" />
</template>

<script>
import Toaster from '../components/elements/Toaster.vue';
import ModalDelete from '../components/elements/ModalDelete.vue';
export default {
  name: 'PermanentDelete',
  data() {
    return {
      message: '',
      notify: false,
    };
  },
  components: { ModalDelete, Toaster },
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

        this.notify = true;
        this.message = data.message;
        setTimeout(() => {
          this.notify = false;
          this.$router.push('/transaction');
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
