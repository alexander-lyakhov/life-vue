import baseComponent from '../base-component';

export default {

    name: 'track-control',

    extends: baseComponent,

    data: function() {
        return {
            val: 0
        }
    },

    props: ['initial-value'],

    mounted: function() {
        this.setValue(this.$props.initialValue || 0);
    },

    methods: {
        //============================================================================
        //
        //============================================================================
        startDrag: function(e) {
            e.target.addEventListener('mousemove', this.mousemoveHandler);
        },

        //============================================================================
        //
        //============================================================================
        stopDrag: function(e) {
            e.target.removeEventListener('mousemove', this.mousemoveHandler);
        },

        //============================================================================
        //
        //============================================================================
        mousemoveHandler: function(e) {
            if (e.buttons === 1) {
                this.setValue(Math.ceil((e.offsetX / e.target.offsetWidth) * 20) * 5);
            }
        },

        //============================================================================
        //
        //============================================================================
        mouseWheelHandler: function(e) {
            e.preventDefault();
            e.stopPropagation();

            var direction = e.deltaY || e.detail || e.wheelDelta;

            Math.abs(direction) === 120 ?
                direction > 0 ? this.increaseValue():this.decreaseValue():
                direction < 0 ? this.increaseValue():this.decreaseValue();
        },

        //============================================================================
        //
        //============================================================================
        setValue: function(val) {

            val = val > 100 ? 100:val;
            val = val <   0 ?   0:val;

            this.val = val;

            this.$emit('change', this.val);

            return this;
        },

        //============================================================================
        //
        //============================================================================
        increaseValue: function() {
            return this.setValue(this.value + 5);
        },

        //============================================================================
        //
        //============================================================================
        decreaseValue: function() {
            return this.setValue(this.value - 5);

        },

        //============================================================================
        //
        //============================================================================
        isSegmentOn: function(index) {
            return index < this.value / 5;
        }
    },

    computed: {
        //============================================================================
        //
        //============================================================================
        value: {
            set: function(val) {
                this.setValue(val);
            },

            get: function() {
                return this.val;
            }
        }
    },

    directives: {
        //============================================================================
        //
        //============================================================================
        wheel: {
            inserted: function(el, binding) {
                el.addEventListener('wheel', binding.value.bind(this));
                el.addEventListener('DOMMouseScroll', binding.value.bind(this));
            }
        }
    }
};
