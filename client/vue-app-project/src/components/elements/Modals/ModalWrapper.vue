<template>
  <div
    v-if="visible"
    class="w-full h-full min-w-screen min-h-screen fixed top-0 left-0 z-[999] bg-black/50 flex justify-center items-center"
    @click.self="hide()">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWrapper',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hide() {
      this.$emit('close');
    },
  },
};
</script>
