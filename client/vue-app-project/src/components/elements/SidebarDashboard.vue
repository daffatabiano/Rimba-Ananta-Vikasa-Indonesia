<template>
  <aside
    class="bg-slate-800 w-48 z-50 h-screen flex flex-col justify-between max-h-screen fixed unset-y-0 left-0 py-4 px-2">
    <div class="text-white text-lg font-semibold">Rimba | WebDev.</div>

    <ul class="flex flex-col space-y-2">
      <li
        @click="this.$router.push('/dashboard')"
        class="w-full bg-slate-700 hover:text-slate-400 flex items-center font-bold text-white p-4 rounded-lg">
        <a href="#" class="flex items-center gap-2"
          ><i class="text-2xl text-white"
            ><svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#fff"
              viewBox="0 0 24 24">
              <path
                d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4ZM5 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5Zm14 2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4Z" />
            </svg> </i
          >Dashboard</a
        >
      </li>
      <li
        @click="this.$router.push('/product')"
        class="w-full bg-slate-700 hover:text-slate-400 flex items-center font-bold text-white p-4 rounded-lg">
        <a href="/product" class="flex items-center gap-2"
          ><i class="text-2xl text-white"
            ><svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#fff"
              viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                clip-rule="evenodd" />
            </svg> </i
          >Product</a
        >
      </li>
      <li
        @click="this.$router.push('/transaction')"
        class="w-full bg-slate-700 hover:text-slate-400 flex items-center font-bold text-white p-4 rounded-lg">
        <a href="/transaction" class="flex items-center gap-2"
          ><i class="text-2xl text-white"
            ><svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#fff"
              viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                clip-rule="evenodd" />
            </svg> </i
          >Transactions</a
        >
      </li>
    </ul>

    <button
      type="button"
      @click="handleLogout"
      class="p-2 bg-slate-400 rounded-lg hover:bg-slate-500 hover:text-slate-400 text-white">
      Logout
    </button>
  </aside>
</template>
<script>
import { MdDashboardOutlined } from 'oh-vue-icons/icons';
export default {
  name: 'SidebarDashboard',
  components: { MdDashboardOutlined },

  data() {
    return {};
  },

  methods: {
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/');
    },
  },
};
</script>
