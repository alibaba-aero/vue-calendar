<script>
import VuecCalendar from './core/calendar.vue';

export default {
  extends: VuecCalendar,
  props: {
    value: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      localSelection: this.value,
    };
  },
  computed: {
    monthSelections() {
      const map = {};

      this.localSelection.forEach((item) => {
        const month = item.format('jYYYY/jMM');
        map[month] = map[month] || [];
        map[month].push(item);
      });

      return map;
    },
  },
  watch: {
    value(newValue) {
      this.localSelection = newValue;
    },
  },
  methods: {
    getDayData({ dayKey, monthKey, date }) {
      const data = (this.data[monthKey] || {})[dayKey] || {};
      const isSelected = this.localSelection.length > 0 && date.isSame(this.localSelection[0], 'day');
      return Object.assign({}, data, {
        class: {
          hover: this.dateUnderCursor && date.isSame(this.dateUnderCursor),
          start: isSelected,
          end: isSelected,
        },
      });
    },
    onHover(date) {
      if (this.dateUnderCursor !== date) {
        this.dateUnderCursor = date;
      }
    },
    selectionChange({ date }) {
      this.localSelection.length = 0;
      this.localSelection.push(date);
      this.$emit('input', this.localSelection);
    },
  },
};
</script>

<style lang="scss">

</style>
