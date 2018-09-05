<template>
  <div>
    <div>
      <h3>Range Input</h3>
      <vuec-range-input
        :min-date="now"
        :max-date="maxDate"
        :mobile="false"
        theme="indra" />
    </div>
    <div>
      <h3>Single Input</h3>
      <vuec-single-input/>
    </div>
  </div>
</template>

<script>
import { VuecRangeInput, VuecSingleInput } from '../../src';
import dayjs from '../../src/date';

export default {
  components: {
    VuecRangeInput,
    VuecSingleInput,
  },
  data() {
    return {
      now: dayjs(),
      maxDate: dayjs().add(26, 'day'),
    };
  },
};
</script>
