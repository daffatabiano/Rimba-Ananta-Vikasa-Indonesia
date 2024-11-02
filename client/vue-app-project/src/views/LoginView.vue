<template>
  <div
    class="min-h-screen h-full w-full min-2-screen bg-slate-200/90 p-4 flex flex-col justify-center items-center">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>
