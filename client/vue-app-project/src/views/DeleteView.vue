<template>
  <Toaster :message="message" :notify="notify" />
  <ModalDelete :handleDelete="handleDelete" />
</template>

<script>
import Toaster from '../components/elements/Toaster.vue';
import ModalDelete from '../components/elements/ModalDelete.vue';

export default {
  name: 'DeleteView',
  components: { ModalDelete, Toaster },
  data() {
    return {
      notify: false,
      message: '',
    };
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
        const data = await res.json();
        this.notify = true;
        this.message = data.message;
        setTimeeout(() => {
          this.notify = false;
          this.$router.push('/transaction');
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
