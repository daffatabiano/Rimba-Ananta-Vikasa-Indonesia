<template>
  <div
    v-if="notify == true"
    :class="borderClass"
    class="min-w-32 border-2 z-[9999] px-4 py-2 rounded-lg bg-white/90 fixed bottom-4 right-4">
    <p :class="textClass" class="text-center text-lg p-2">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Toaster',
  props: {
    message: {
      type: String,
    },
    notify: {
      type: Boolean,
    },
  },
  computed: {
    borderClass() {
      if (this?.message?.includes('Success')) {
        return 'border-green-500';
      } else {
        return 'border-red-500';
      }
    },
    textClass() {
      if (this?.message?.includes('Success')) {
        return 'text-green-700';
      } else {
        return 'text-red-700';
      }
    },
  },
};
</script>
