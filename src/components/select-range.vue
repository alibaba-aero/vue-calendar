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
            localSelection: [].concat(this.value),
        };
    },
    computed: {
        monthSelections() {
            const map = {};

            this.localSelection.forEach((item) => {
                const month = item.format('YYYY/MM');
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
            const start = this.localSelection[0] || this.dateUnderCursor;
            const end = this.localSelection[1] || this.dateUnderCursor;

            return Object.assign({}, data, {
                class: [
                    data.class,
                    {
                        hover: this.dateUnderCursor && date.isSame(this.dateUnderCursor),
                        start: this.localSelection.length > 0 && date.isSame(start, 'day'),
                        end: this.localSelection.length > 1 && date.isSame(end, 'day'),
                        selected: this.localSelection.length > 1 && date.isBetween(start, end, 'days', '[]'),
                        highlight: this.dateUnderCursor && this.localSelection.length === 1 && date.isBetween(start, this.dateUnderCursor, 'days', '[]'),
                    },
                ],
            });
        },
        onHover(date) {
            if (this.dateUnderCursor !== date) {
                this.dateUnderCursor = date;
            }
        },
        onDayClick({ date }) {
            if (this.localSelection.length === 0 || this.localSelection[0] === undefined) {
                this.$set(this.localSelection, 0, date);
            } else if (this.localSelection.length !== 1) {
                this.localSelection.length = 0;
                this.localSelection.push(date);
            }
            if (date.isAfter(this.localSelection[0], 'day')) {
                this.localSelection.push(date);
            } else {
                this.$set(this.localSelection, 0, date);
            }
            this.$emit('input', this.localSelection);
        },
    },
};
</script>

<style lang="scss">

</style>
