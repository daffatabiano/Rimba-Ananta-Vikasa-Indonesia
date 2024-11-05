<template>
  <table class="w-full border border-slate-700 border-collapse">
    <thead class="bg-slate-700 text-white text-center">
      <tr class="border-collapse border-white">
        <th v-for="header in headers" class="border border-collapse">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody
      v-if="datas?.length > 0"
      class="overflow-auto border-collapse max-h-96 h-full">
      <tr
        class="even:bg-slate-200 odd:bg-slate-300 border border-collapse"
        v-for="data in datas"
        :key="data._id">
        <td class="p-2 border border-collapse">
          {{ data.customer || data.productCode || data?.action?.split(' ')[0] }}
        </td>
        <td class="p-2 border border-collapse">
          {{
            data.invoiceNo ||
            data.name ||
            data?.action?.split(' ')[1] +
              ' ' +
              (data?.action?.split(' ')[2] !== undefined
                ? data?.action?.split(' ')[2]
                : '')
          }}
        </td>
        <td class="p-2 border border-collapse">
          <span
            v-if="data.products"
            v-for="(product, index) in data.products"
            :key="product._id">
            {{ product?.productCode }} <br />
          </span>
          <span v-else>
            {{ data.price || this.formatDate(data.timestamp) }} <br />
          </span>
        </td>
        <td class="p-2 border border-collapse">
          {{
            data?.date?.slice(0, 10).split('-').reverse().join('/') ||
            data.quantity ||
            details
          }}
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="6" class="text-center p-2">
          No data available
          <a href="/transaction" class="text-slate-800 font-bold italic"
            >Input data</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ReusableTable',
  props: {
    details: {
      type: Array,
    },
  },
  data() {
    return {
      formatDate: (date) => {
        const newDate = new Date(date);

        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC',
        };
        const formattedDate = newDate.toLocaleString('id-ID', options);

        const finalFormattedDate = formattedDate
          .replace(/\./g, ':')
          .replace(', ', ' ')
          .replace('pukul ', 'at ');

        return finalFormattedDate;
      },
    };
  },
  props: {
    datas: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
};
</script>
