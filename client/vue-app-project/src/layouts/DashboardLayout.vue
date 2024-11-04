<template>
  <div
    class="md:hidden p-4 fixed z-[999] unset-0 w-full h-screen bg-slate-800/50">
    <div class="w-full rounded-lg bg-white drop-shadow-lg p-4">
      <div class="flex flex-col gap-4 justify-center items-center h-full">
        <img
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzR0dmF1cGQ3bGZ6MmQ4OWQ3dGU2YnlpMm83NjA1ZGR6eWR1cDg5bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7WTDH9gYo71TurPq/giphy.gif"
          alt=""
          class="w-full h-fit object-contain rounded-lg" />

        <p class="text-2xl font-bold text-red-500">
          This Page Only For Desktop
        </p>
        <button class="w-full p-2 bg-red-600 text-white rounded-lg">
          Go Back
        </button>
      </div>
    </div>
  </div>
  <HeadersDashboard />
  <SidebarDashboard />
  <div class="ps-52 pt-28 pe-4"><slot></slot></div>
</template>

<script>
import HeadersDashboard from '../components/elements/HeadersDashboard.vue';
import SidebarDashboard from '../components/elements/SidebarDashboard.vue';

export default {
  name: 'DashboardLayout',
  components: {
    HeadersDashboard,
    SidebarDashboard,
  },
};
</script>
