<script>
import VuecCalendar from './core/calendar.vue';
import dayjs from '../date';

export default {
    extends: VuecCalendar,
    props: {
        value: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            localSelection: this.value ? dayjs(this.value) : null,
        };
    },
    computed: {
        monthSelections() {
            const map = {};
            if (this.localSelection) {
                const month = this.localSelection.format('YYYY/MM');
                map[month] = map[month] || [];
                map[month].push(this.localSelection);
            }
            return map;
        },
    },
    watch: {
        value(newValue) {
            this.localSelection = newValue ? dayjs(newValue) : null;
        },
    },
    methods: {
        getDayData({ dayKey, monthKey, date }) {
            const data = (this.data[monthKey] || {})[dayKey] || {};
            const isSelected = this.localSelection && date.isSame(this.localSelection, 'day');
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
        onDayClick(selection) {
            this.localSelection = selection.date;
            this.$emit('input', selection);
        },
    },
};
</script>

<style lang="scss">

</style>
