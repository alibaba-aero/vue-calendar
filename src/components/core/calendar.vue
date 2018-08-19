<template>
  <div
    :class="['vuec-theme-' + theme]"
    class="vuec-calendar">
    <div
      v-if="showNavigation"
      class="vuec-nav"
      align-v="center">
      <span
        class="vuec-btn-prev"
        @click="previousPage">
        <slot name="prev-page">
          <icon-arrow-right />
        </slot>
      </span>
      <span
        class="vuec-btn-next"
        @click="nextPage">
        <slot name="next-page">
          <icon-arrow-left />
        </slot>
      </span>
    </div>
    <div class="vuec-month-wrapper">
      <vuec-month
        v-for="(month, index) in months"
        :key="index"
        :adapter="getDayData"
        :title="month.title"
        :date="month.date"
        :min-date="minDate"
        :max-date="maxDate"
        :selectable="selectable"
        :inventory="month.inventory"
        :selection="month.selections"
        :day-view="dayView"
        @selectionChange="selectionChange"
        @hover="onHover"
        @blur="onBlur"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali';

import VuecMonth from './month.vue';
import DefaultDayView from './default-day.vue';
import IconArrowLeft from '../icons/arrow-left.vue';
import IconArrowRight from '../icons/arrow-right.vue';

export default {
  components: {
    VuecMonth,
    IconArrowLeft,
    IconArrowRight,
  },
  props: {
    theme: {
      type: String,
      default: 'default',
    },
    showPreviousWeeks: {
      type: Boolean,
      default: true,
    },
    showNavigation: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Object,
      default: () => moment(),
    },
    visibleMonths: {
      type: Number,
      default: 1,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    minDate: {
      type: [Object, String],
      default: null,
    },
    maxDate: {
      type: [Object, String],
      default: null,
    },
    dayView: {
      type: Object,
      default: () => DefaultDayView,
    },
    selections: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      now: moment(),
      dateUnderCursor: null,
    };
  },
  computed: {
    year() {
      return this.date.format('jYYYY');
    },
    monthSelections() {
      const map = {};

      this.selections.forEach((item) => {
        const month = moment(item, 'jYYYY/jMM/jDD').format('jYYYY/jMM');
        map[month] = map[month] || [];
        map[month].push(item);
        return map;
      });

      return map;
    },
    months() {
      const months = [];

      let date = moment(this.date);

      if (this.showPreviousWeeks) {
        date.startOf('jMonth');
      }

      const end = moment(this.date).add(this.visibleMonths - 1, 'jMonth').endOf('jMonth');

      while (date <= end) {
        const monthKey = date.format('jYYYY/jMM');

        months.push({
          title: date.format('jMMMM'),
          date: moment(date),
          selections: this.monthSelections[monthKey],
        });

        date = date.add(1, 'jMonth').startOf('jMonth');
      }

      return months;
    },
  },
  methods: {
    onHover(date) {
      if (!date.isSame(this.dateUnderCursor)) {
        this.dateUnderCursor = date;
      }
    },
    onBlur(date) {
      if (date === null) {
        this.dateUnderCursor = null;
      }
    },
    getDayData({ dayKey, monthKey }) {
      return (this.data[monthKey] || {})[dayKey] || {};
    },
    selectionChange({ date, selected }) {
      this.$emit('selectionChange', { date, selected });
    },
    previousPage() {
      this.date = this.date.subtract(this.visibleMonths, 'jMonth').startOf('jMonth');
      this.$emit('previous-page', this.date);
    },
    nextPage() {
      this.date = this.date.add(this.visibleMonths, 'jMonth').startOf('jMonth');
      this.$emit('next-page', this.date);
    },
  },
};
</script>

<style lang="scss">
.vuec-calendar {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 15px;
  * {
    box-sizing: inherit;
  }
  .vuec-month-wrapper {
    display: flex;
    flex: 1;
    .vuec-month {
      margin: 0 0.5em;
    }
  }
  .vuec-nav {
    display: flex;
    align-items: center;
    .vuec-nav-title {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
