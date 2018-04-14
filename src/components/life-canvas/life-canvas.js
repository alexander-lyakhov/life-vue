import baseComponent from '../base-component';

export default {

    name: 'life-canvas',

    extends: baseComponent,

    template: '<canvas @mousedown="mouseDown"></canvas>',

    props: ['width', 'height'],

    mounted: function() {
        this.deg = Math.PI / 180,

        this.width = this.$props.width;
        this.height = this.$props.height;

        this.$el.width = this.width;
        this.$el.height = this.height;

        this.xCenter = this.width  >> 1;
        this.yCenter = this.height >> 1;

        this.virtualPage = document.createElement('canvas');
        this.virtualPage.width  = this.width;
        this.virtualPage.height = this.height;

        this.visibleCtx = this.$el.getContext('2d');
        this.virtualCtx = this.virtualPage.getContext('2d');
    },

    methods: {
        //======================================================
        //
        //======================================================
        mouseDown: function(e) {
            this.$emit('mouseDown', e);
        },

        //======================================================
        //
        //======================================================
        render: function() {
            this.clear(this.visibleCtx);
            this.visibleCtx.drawImage(this.virtualPage, 0, 0);
            this.clear(this.virtualCtx);

            this.$emit('renderComplete');

            return this;
        },

        //======================================================
        //
        //======================================================
        clear: function(context) {
            context.clearRect(0, 0, this.width, this.height);
            return this;
        }
    }
};