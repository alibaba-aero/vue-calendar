<template>
    <div class="vuec-month">
        <div
            :show="showTitle"
            class="vuec-month-name"
        >
            <slot name="month-title" :date="date" />
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
                    v-for="day in days"
                    :key="day.key"
                    :index="day.key"
                    :data="day.data"
                    :date="day.date"
                    :title="day.title"
                    :aria-hidden="day.hide"
                    :disabled="day.disabled"
                    :selectable="!day.disabled && selectable"
                    :selected="day.selected"
                    class="vuec-col"
                    @click="$emit('click-day', $event)"
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
        dateUnderCursor: {
            type: Object,
            default: null,
        },
    },
    data() {
        const startOfWeek = this.date.startOf('week').day();
        return {
            locale: this.date.$locale().name,
            weekDays: rotate(this.date.$locale().weekdays, startOfWeek),
            days: this.getDaysOfMonthArray(this.date),
        };
    },
    computed: {
        propsToTriggerRecreateDays() {
            // it's only required to reference those properties
            this.date; // eslint-disable-line
            this.minDate; // eslint-disable-line
            this.maxDate; // eslint-disable-line
            this.selection; // eslint-disable-line
            this.adapter; // eslint-disable-line
            // and then return a different value every time
            return Date.now(); // or performance.now()
        },
        propsToTriggerDataReaload() {
            // it's only required to reference those properties
            this.dateUnderCursor; // eslint-disable-line
            // and then return a different value every time
            return Date.now(); // or performance.now()
        },
    },
    watch: {
        propsToTriggerRecreateDays() {
            this.days = this.getDaysOfMonthArray(this.date);
        },
        propsToTriggerDataReaload() {
            this.days.forEach((day) => {
                const $day = day;
                $day.data = this.adapter({
                    date: day.date,
                    dayKey: day.key,
                    monthKey: day.date.format('YYYY/MM'),
                });
            });
        },
    },
    methods: {
        getDaysOfMonthArray($date) {
            const activeMonth = $date.month();
            const monthKey = $date.format('YYYY/MM');
            // move to start of week if it's not
            let date = $date.startOf('Month').startOf('week');
            const end = $date.endOf('Month').endOf('week');

            const days = [];

            const minDate = this.minDate ? dayjs(this.minDate).startOf('day') : null;
            const maxDate = this.maxDate ? dayjs(this.maxDate).endOf('day') : null;

            while (date.isBefore(end)) {
                const dayKey = date.format('YYYY/MM/DD');
                const data = this.adapter({
                    date,
                    dayKey,
                    monthKey,
                }) || {};
                if ((minDate && date.isBefore(minDate))
                    || (maxDate && date.isAfter(maxDate))
                    || (date.month() !== activeMonth)) {
                    days.push({
                        key: dayKey,
                        disabled: true,
                        hide: date.month() !== activeMonth,
                        date: dayjs(date),
                        data,
                    });
                } else {
                    days.push({
                        key: dayKey,
                        data,
                        disabled: data.disabled,
                        date: dayjs(date),
                        selected: this.selection.indexOf(dayKey) !== -1,
                    });
                }

                date = date.add(1, 'days');
            }
            return days;
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
