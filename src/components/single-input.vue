<template>
    <div class="vuec-single-input">
        <div
            class="vuec-date-inputs"
            @click="showPicker"
        >
            <div class="input">
                {{ formattedDate }}
            </div>
        </div>
        <div
            v-show="visible"
            class="vuec-popup"
            @click="onClickDelegate"
        >
            <VuecSelectSingle
                :theme="theme"
                :date="date"
                :value="selection"
                :visible-months="visibleMonths"
                :selectable="true"
                :min-date="minDate"
                :max-date="maxDate"
                @input="onSelectionChange"
            />
        </div>
    </div>
</template>

<script>
import VuecSelectSingle from './select-single.vue';
import dayjs from '../date';

export default {
    components: {
        VuecSelectSingle,
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
        date: {
            type: [Object, String],
            default: undefined,
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
            selection: undefined,
        };
    },
    computed: {
        formattedDate() {
            return this.selection ? this.selection.format('YYYY/MM/DD') : '';
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
        onSelectionChange({ date }) {
            this.selection = dayjs(date);
            this.$emit('input', this.selection);
            this.visible = false;
        },
    },
};
</script>

<style lang="scss">
.vuec-single-input {
    .vuec-popup {
        flex-direction: column;
        width: 400px;
        background: #fff;
        box-shadow: 0 15px 12px rgba(0,0,0,0.22), 0 0 38px rgba(0,0,0,0.30);
        border-radius: 4PX;
        padding: 16px;
        direction: rtl;
        position: absolute;
        z-index: 99;
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
