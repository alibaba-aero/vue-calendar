<template>
    <div>
        <div>
            <h2>Gregory</h2>
            <div>
                <h3>Range Input</h3>
                <VuecRangeInput
                    :min-date="now"
                    :max-date="maxDate"
                    :mobile="false"
                    theme="orange"
                />
            </div>
            <div>
                <h3>Single Input</h3>
                <VuecSingleInput
                    theme="orange"
                />
            </div>
        </div>
        <div class="jalali">
            <h2>Jalali</h2>
            <div>
                <h3>Range Input</h3>
                <VuecRangeInput
                    :date="todayInJalali"
                    :min-date="now"
                    :max-date="maxDate"
                    :mobile="false"
                    theme="orange"
                />
            </div>
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
            todayInJalali: dayjs().calendar('jalali').locale('fa'),
            maxDate: dayjs().add(46, 'day'),
        };
    },
    mounted() {
        window.dayjs = dayjs;
    },
};
</script>

<style lang="scss">
.jalali {
    direction: rtl;
}
</style>
