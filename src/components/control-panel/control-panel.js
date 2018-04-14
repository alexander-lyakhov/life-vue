import baseComponent from "../base-component";

import trackControl from "../track-control/track-control.vue";
import controlButton from "../control-button/control-button.vue";

export default {

    name: 'control-panel',

    extends: baseComponent,

    components: {
        trackControl,
        controlButton
    },

    data: function() {
        return {
            speed: app.state.speed
        }
    },

    created: function() {
        this.buttons = [];

        this.BUTTONS_STATE = {
            PAUSE: '1111',
            PLAY:  '1000',
            EDIT:  '0100'
        }
    },

    mounted: function() {
        this.$nextTick(() =>
            this.buttons = this.getChildrenComponents('control-button')
        );
    },

    methods: {

        //===========================================================
        //
        //===========================================================
        setSpeed: function(value) {
            this.speed.value = value;
        },

        //===========================================================
        //
        //===========================================================
        updateButtonsState: function(state) {
            this.buttons.forEach(function(button, index) {
                button.enabled = Boolean(+state[index]);
            });
        },

        //===========================================================
        //
        //===========================================================
        play: function(trigger) {

            if (trigger) {
                this.updateButtonsState(this.BUTTONS_STATE.PLAY);
                this.$emit('play');

            } else {
                this.updateButtonsState(this.BUTTONS_STATE.PAUSE);
                this.$emit('pause');
            }

            return this;
        },

        //===========================================================
        //
        //===========================================================
        edit: function(trigger) {

            if (trigger) {
                this.updateButtonsState(this.BUTTONS_STATE.EDIT);
                this.$emit('startEdit');

            } else {
                this.updateButtonsState(this.BUTTONS_STATE.PAUSE);
                this.$emit('stopEdit');
            }

            return this;
        },

        //===========================================================
        //
        //===========================================================
        reset: function() {
            this.$emit('reset');
        },

        //===========================================================
        //
        //===========================================================
        clear: function() {
            this.$emit('clear');
        }
    }
};