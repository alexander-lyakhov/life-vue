import baseComponent from "../base-component";

export default {

    name: 'control-button',

    extends: baseComponent,

    data: function() {
        return {
            isEnabled: true
        }
    },

    created: function() {
        this.trigger = 0;
    },

    props: ['display-text'],

    mounted: function() {
        this.value = this.$el.textContent;
    },

    methods: {
        //===============================================================================
        //
        //===============================================================================
        clickHandler: function() {
            this.trigger ^= 1;

            if (this.$props.displayText) {
                this.$el.textContent = this.value = this.$props.displayText[this.trigger];
            }

            this.$emit('click', this.trigger);
        }
    },

    computed: {
        //===============================================================================
        //
        //===============================================================================
        text: function() {
            return this.value;
        },

        //===============================================================================
        //
        //===============================================================================
        enabled: {
            set: function(isEnabled) {
                this.isEnabled = isEnabled;
            },
            get: function() {
                return this.isEnabled;
            }
        }
    }
};
