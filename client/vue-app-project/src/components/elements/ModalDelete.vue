<template>
  <div
    class="w-full h-full min-w-screen min-h-screen fixed top-0 left-0 z-50 bg-black/50 flex justify-center items-center">
    <div class="bg-white p-4 rounded-lg drop-shadow" @click.stop>
      <p class="text-center text-red-500 text-xl my-4">
        Are you sure you want to delete this?
      </p>
      <div class="flex justify-end space-x-2">
        <button
          @click="this.$router.push('/dashboard')"
          type="button"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Back
        </button>
        <button
          @click="handleDelete"
          type="button"
          class="bg-red-500 text-white px-4 py-2 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalDelete',
  methods: {
    async handleDelete() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/transactions/${
            this.$route.params.id
          }`,
          {
            method: 'DELETE',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        if (res.status === 200) {
          this.$router.push('/dashboard');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
