<template>
    <div
        :class="['vuec-theme-' + theme, date.$C]"
        class="vuec-calendar"
    >
        <div
            v-if="showNavigation"
            class="vuec-nav"
            align-v="center"
        >
            <span
                class="vuec-btn-prev"
                @click="previousPage"
            >
                <slot name="prev-page">
                    <IconArrowRight />
                </slot>
            </span>
            <span
                class="vuec-btn-next"
                @click="nextPage"
            >
                <slot name="next-page">
                    <IconArrowLeft />
                </slot>
            </span>
        </div>
        <div class="vuec-month-wrapper">
            <VuecMonth
                v-for="(month, monthIndex) in months"
                :key="monthIndex"
                :adapter="getDayData"
                :date="month.date"
                :min-date="minDate"
                :max-date="maxDate"
                :selectable="selectable"
                :inventory="month.inventory"
                :selection="month.selections"
                :date-under-cursor="dateUnderCursor"
                @click-day="onDayClick"
                @hover="onHover"
                @blur="onBlur"
            >
                <template
                    slot="day-of-week"
                    slot-scope="{ name, index, locale }"
                >
                    <slot
                        v-bind="{ name, index, locale }"
                        name="day-of-week"
                    >
                        {{ name }}
                    </slot>
                </template>
                <template
                    slot="day"
                    slot-scope="props"
                >
                    <slot
                        v-bind="props"
                        name="day"
                    >
                        <div class="vuec-default-day">
                            {{ props.date.format('D') }}
                        </div>
                    </slot>
                </template>
                <template
                    slot="month-title"
                    slot-scope="scope">
                    <slot name="month-title" v-bind="scope">
                        <h2>{{ scope.date.format('MMMM') }}</h2>
                    </slot>
                </template>
            </VuecMonth>
        </div>
    </div>
</template>

<script>
import dayjs from '../../date';

import VuecMonth from './month.vue';
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
            default: () => dayjs(),
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
        selections: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            localDate: this.date,
            dateUnderCursor: null,
        };
    },
    computed: {
        monthSelections() {
            const map = {};

            this.selections.forEach((item) => {
                const month = dayjs(item, 'YYYY/MM/DD').format('YYYY/MM');
                map[month] = map[month] || [];
                map[month].push(item);
                return map;
            });

            return map;
        },
        months() {
            const months = [];

            let date = dayjs(this.localDate);

            if (this.showPreviousWeeks) {
                date.startOf('Month');
            }
            let index = 0;
            while (index < this.visibleMonths) {
                const monthKey = date.format('YYYY/MM');

                months.push({
                    date: dayjs(date),
                    selections: this.monthSelections[monthKey],
                });

                date = date.add(1, 'Month').startOf('Month');
                index += 1;
            }

            return months;
        },
    },
    watch: {
        date(newDate) {
            this.localDate = newDate;
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
        onDayClick($event) {
            this.$emit('click-day', $event);
        },
        previousPage() {
            this.localDate = this.localDate.subtract(this.visibleMonths, 'Month').startOf('Month');
            this.$emit('previous-page', this.localDate);
        },
        nextPage() {
            this.localDate = this.localDate.add(this.visibleMonths, 'Month').startOf('Month');
            this.$emit('next-page', this.localDate);
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
