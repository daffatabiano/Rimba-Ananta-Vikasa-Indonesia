<template>
  <Navbar />
  <div
    class="min-h-screen h-full w-full min-2-screen bg-slate-200/90 p-4 flex flex-col justify-center items-center">
    <img
      src="/images/coming-soon.png"
      alt=""
      class="w-1/2 h-fit object-contain m-auto" />
    <h1
      class="tracking-widest font-bold italic text-2xl md:text-4xl text-amber-500">
      Under Construction!
    </h1>
    <button
      type="button"
      @click="$router.push('/dashboard')"
      class="w-full md:w-auto px-4 py-2 bg-yellow-500 text-yellow-50 mt-2 font-bold rounded-lg">
      Go To Dashboard
    </button>
  </div>
</template>

<script>
import Navbar from '../components/elements/Headers.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style></style>
