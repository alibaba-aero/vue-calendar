<template>
  <div class="vuec-range-input">
    <div
      class="vuec-date-inputs"
      @click="showPicker"
    >
      <div class="input">{{ formattedDates[0] }}</div>
      <div class="input">{{ formattedDates[1] }}</div>
    </div>
    <transition name="popup-animation">
      <div
        v-if="visible"
        :class="{ mobile: mobile }"
        class="vuec-popup"
        @click="onClickDelegate"
      >
        <div
          v-if="mobile"
          class="vuec-popup-header">
          <slot name="title">
            تاریخ ورود و خروج
          </slot>
          <div
            class="vuec-popup-close"
            @click="showPicker(false)">
            <icon-close/>
          </div>
        </div>
        <vuec-select-range
          :theme="theme"
          :value="dates"
          :min-date="minDate"
          :max-date="maxDate"
          :visible-months="2"
          :selectable="true"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import VuecSelectRange from './select-range.vue';
import IconClose from './icons/close.vue';
import idate from '../date';

export default {
  components: {
    VuecSelectRange,
    IconClose,
  },
  props: {
    theme: {
      type: String,
      default: 'default',
    },
    mobile: {
      type: Boolean,
      default: false,
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
    maxDate: {
      type: [Object, String],
      default: null,
    },
    visibleMonths: {
      type: Number,
      default: 1,
    },
    value: {
      type: Array,
      default: () => ([]),
    },
    open: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD',
    },
  },
  data() {
    const [fromDate = idate(), toDate = idate()] = this.value;
    return {
      visible: this.open,
      temporaryDisableClickListen: false,
      fromDate,
      toDate,
      dates: [
        idate(fromDate),
        idate(toDate),
      ],
    };
  },
  computed: {
    formattedDates() {
      return this.dates.map(date => date.format(this.format));
    },
  },
  watch: {
    open(newValue) {
      this.showPicker(newValue);
    },
  },
  mounted() {
    this.showPicker(this.open);
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
    showPicker(shown = true) {
      this.temporaryDisableClickListen = shown;
      this.visible = shown;
    },
    onClickDelegate($event) {
      $event.stopPropagation();
    },
    onSelectionChange(selections) {
      this.fromDate = idate(selections[0]);
      this.toDate = idate(selections[selections.length - 1]);
      this.$emit('input', [
        this.fromDate,
        this.toDate,
      ]);
    },
  },

};
</script>

<style lang="scss">
.vuec-range-input {
  position: relative;
    .vuec-popup {
        flex-direction: column;
        width: 600px;
        background: #fff;
        box-shadow: 0 15px 12px rgba(0,0,0,0.22), 0 0 38px rgba(0,0,0,0.30);
        border-radius: 4PX;
        padding: 16px;
        direction: rtl;
        position: relative;
        z-index: 10;
        position: absolute;
        top: 100%;
        right: 0;
    }
    .vuec-popup-header {
      padding: 10px 20px;
      height: 30px;
      border-bottom: 1px solid orange;
      .vuec-popup-close {
        float: left;
        border-radius: 99em;
        border: 1px solid;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: orange;
        fill: orange;
        cursor: pointer;
      }
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
    .mobile {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 90%;
      padding: 0;
      overflow: scroll;
      &.popup-animation-enter-active, &.popup-animation-leave-active {
        transition: right .5s;
        right: 0;
      }
      &.popup-animation-enter, &.popup-animation-leave-to {
        right: -100%;
      }
      .vuec-calendar {
        width: 100%;
      }
      .vuec-nav {
        display: none;
      }
      .vuec-month-wrapper {
        flex-direction: column;
      }
    }
}
</style>
