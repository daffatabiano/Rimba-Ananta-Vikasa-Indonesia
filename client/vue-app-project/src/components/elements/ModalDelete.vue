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
  props: {
    handleDelete: {
      type: Function,
      required: true,
    },
  },
};
</script>
