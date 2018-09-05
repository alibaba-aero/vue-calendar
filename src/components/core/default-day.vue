<template>
  <div v-if="date">
    <div class="vuec-default-day">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
      default: null,
    },
    data: {
      type: Object,
      default: null,
    },
  },
  computed: {
    formattedDate() {
      return this.date.format('D');
    },
  },
};

</script>
