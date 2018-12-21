<template>
  <div
    :class="[data.class, { disabled, selected, selectable }]"
    class="vuec-day"
    @mouseover="$emit('hover', date)"
    @mouseout="$emit('blur', date)"
    @click="onClick"
  >
    <div class="vuec-day-content">
      <slot
        :data="data"
        :date="date"
        name="day"
      >
        <div class="vuec-default-day">
          {{ date.format('D') }}
        </div>
      </slot>
    </div>
    <div class="vuec-square-placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    date: {
      type: Object,
      default: null,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (this.selectable) {
        this.$emit('click', this.index);
      }
    },
  },
};
</script>

<style lang="scss">
.vuec-day {
    position: relative;
    padding: 0;

    .vuec-square-placeholder {
        margin-bottom: 100%;
    }

    &[aria-hidden="true"] {
      opacity: 0;
      display: none;
      pointer-events: none;
      @media (min-width: 768px) {
          display: block;
      }
    }

    .vuec-day-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
