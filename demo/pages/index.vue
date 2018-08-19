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
import moment from 'moment';

import { VuecRangeInput, VuecSingleInput } from '../../src';

export default {
  components: {
    VuecRangeInput,
    VuecSingleInput,
  },
  data() {
    return {
      now: moment(),
      maxDate: moment().add(20, 'day'),
    };
  },
};
</script>
