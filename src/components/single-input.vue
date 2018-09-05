<template>
  <div class="vuec-range-input">
    <div
      class="vuec-date-inputs"
      @click="showPicker"
    >
      <div class="input">{{ formattedDates[0] }}</div>
      <div class="input">{{ formattedDates[1] }}</div>
    </div>
    <div
      v-show="visible"
      class="vuec-popup"
      @click="onClickDelegate"
    >
      <vuec-single-select
        :theme="theme"
        :value="dates"
        :visible-months="1"
        :selectable="true"
      />
    </div>
  </div>
</template>

<script>
import VuecSingleSelect from './select-single.vue';
import dayjs from '../date';

export default {
  components: {
    VuecSingleSelect,
  },
  props: {
    theme: {
      type: String,
      default: 'default',
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selectionMode: {
      type: String,
      default: 'single',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    minDate: {
      type: [Object, String],
      default: null,
    },
    visibleMonths: {
      type: Number,
      default: 1,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.open,
      temporaryDisableClickListen: false,
      fromDate: dayjs(),
      toDate: dayjs(),
      dates: [],
    };
  },
  computed: {
    formattedDates() {
      return this.dates.map(date => date.format('YYYY/MM/DD'));
    },
  },
  watch: {
    open(newValue) {
      this.visible = newValue;
      this.temporaryDisableClickListen = true;
    },
  },
  mounted() {
    document.body.addEventListener('click', this.handleBodyClick);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.handleBodyClick);
  },
  methods: {
    handleBodyClick() {
      if (this.visible && !this.temporaryDisableClickListen) {
        this.visible = false;
        this.$emit('hide');
      }
      this.temporaryDisableClickListen = false;
    },
    showPicker() {
      this.temporaryDisableClickListen = true;
      this.visible = true;
    },
    onClickDelegate($event) {
      $event.stopPropagation();
    },
    onSelectionChange(selections) {
      this.fromDate = dayjs(selections[0], 'YYYY/MM/DD');
      this.toDate = dayjs(selections[selections.length - 1], 'YYYY/MM/DD');
      this.$emit('input', [
        this.fromDate,
        this.toDate,
      ]);
    },
  },

};
</script>

<style lang="scss">
.vuec-calendar.default .vuec-range-input {
    .vuec-popup {
        flex-direction: column;
        width: 600px;
        background: #fff;
        box-shadow: 0 15px 12px rgba(0,0,0,0.22), 0 0 38px rgba(0,0,0,0.30);

        border-radius: 4PX;

        padding: 16px;

        direction: rtl;

        position: relative;
    }
    .vuec-date-inputs {
        align-items: center;
        box-sizing: border-box;
        border: 1px solid #E0E0E0;
        border-radius: 2px;
        display: flex;
        flex: 0 0 400px;
        height: 48px;
        width: 300px;
        .input {
            flex: 1;
        }
    }
    .vuec-btn-next, .vuec-btn-prev {
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 99em;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: calc(50% - 20px);
        box-shadow: 0 0 4px rgba(0,0,0,0.12),0 4px 4px rgba(0,0,0,0.24);
    }
    .vuec-btn-next {
        left: -20px;
    }
    .vuec-btn-prev {
        right: -20px;
    }
}
</style>
