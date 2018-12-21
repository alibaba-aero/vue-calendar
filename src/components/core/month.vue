<template>
  <div class="vuec-month">
    <div
      :show="showTitle"
      class="vuec-month-name"
    >
      <h2>{{ title || date.format('MMMM') }}</h2>
    </div>
    <div class="vuec-week-nav vuec-7col">
      <div
        v-for="(name, index) in weekDays"
        :key="index"
        class="vuec-col"
      >
        <div class="vuec-week-content">
          <slot
            v-bind="{ name, index, locale }"
            name="day-of-week"
          >
            {{ name }}
          </slot>
        </div>
        <div class="vuec-week-placeholder" />
      </div>
    </div>
    <div class="vuec-month-content">
      <div class="vuec-month-days vuec-7col">
        <DayView
          v-for="(day, i) in days"
          :key="day.dayKey"
          :index="i"
          :data="day.data"
          :date="day.date"
          :title="day.title"
          :aria-hidden="day.hide"
          :disabled="day.disabled"
          :selectable="!day.disabled && selectable"
          :selected="day.selected"
          class="vuec-col"
          @click="toggleDay"
          @hover="$emit('hover', $event)"
          @blur="$emit('blur', $event)"
        >
          <template
            slot="day"
            slot-scope="props"
          >
            <slot
              v-bind="props"
              name="day"
            />
          </template>
        </DayView>
      </div>
      <div class="vuec-month-placeholder" />
    </div>
  </div>
</template>

<script>
import dayjs from '../../date';
import { rotate } from '../../utils';
import DayView from './day.vue';

export default {
  components: {
    DayView,
  },
  props: {
    date: {
      type: Object,
      required: true,
    },
    adapter: {
      type: Function,
      default: () => ({}),
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: [Object, String],
      default: null,
    },
    maxDate: {
      type: [Object, String],
      default: null,
    },
    selection: {
      type: Array,
      default: () => [],
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    const startOfWeek = this.date.startOf('week').day();
    return {
      locale: this.date.$locale().name,
      weekDays: rotate(this.date.$locale().weekdays, startOfWeek),
    };
  },
  computed: {
    days() {
      const activeMonth = this.date.month();
      const monthKey = this.date.format('YYYY/MM');
      // move to start of week if it's not
      let date = dayjs(this.date).startOf('Month').startOf('week');
      const end = dayjs(this.date).endOf('Month').endOf('week');

      const days = [];

      const minDate = this.minDate ? dayjs(this.minDate).startOf('day') : null;
      const maxDate = this.maxDate ? dayjs(this.maxDate).endOf('day') : null;

      while (date.isBefore(end)) {
        const dayKey = date.format('YYYY/MM/DD');
        if ((minDate && date.isBefore(minDate))
                    || (maxDate && date.isAfter(maxDate))
                    || (date.month() !== activeMonth)) {
          days.push({
            disabled: true,
            hide: date.month() !== activeMonth,
            date: dayjs(date),
            data: this.adapter({
              date,
              dayKey,
              monthKey,
            }) || {},
          });
        } else {
          days.push({
            key: dayKey,
            data: this.adapter({
              date,
              dayKey,
              monthKey,
            }) || {},
            date: dayjs(date),
            selected: this.selection.indexOf(dayKey) !== -1,
          });
        }

        date = date.add(1, 'days');
      }

      return days;
    },
  },
  methods: {
    toggleDay(index) {
      const day = this.days[index];
      this.$emit('selectionChange', {
        key: day.key,
        date: day.date,
        selected: !day.selected,
      });
    },
  },
};
</script>

<style lang="scss">
.vuec-month {
    display: flex;
    flex: 1;
    flex-direction: column;
    .vuec-month-name {
        text-align: center;
    }
    .vuec-7col {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        .vuec-col {
            max-width: 14.285714285714285714285714285714% !important;
            flex: 1 1 14.28571%;
        }
    }
    .vuec-week-nav {
        text-align: center;
        .vuec-col {
          position: relative;
        }
        .vuec-week-placeholder {
          padding-bottom: 100%;
        }
        .vuec-week-content {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
    }
    .vuec-month-content {
      position: relative;
      .vuec-month-days {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
      .vuec-month-placeholder {
        padding-bottom: calc(100% / 7 * 6);
      }
    }
}
</style>
