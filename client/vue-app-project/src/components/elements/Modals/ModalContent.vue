<template>
  <ModalWrapper :visible="visible">
    <div class="p-4 bg-white rounded-lg drop-shadow m-auto">
      <slot></slot>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from './ModalWrapper.vue';

export default {
  name: 'ModalContent',
  components: {
    ModalWrapper,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
