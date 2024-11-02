<template>
  <div
    class="min-h-screen bg-slate-200 min-w-screen w-full h-full flex justify-center items-center">
    <<RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
  components: {
    RegisterForm,
  },
};
</script>
