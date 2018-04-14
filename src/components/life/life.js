import baseComponent from '../base-component';

import lifeCanvas from '../life-canvas/life-canvas.vue';
import controlPanel from '../control-panel/control-panel.vue';

import {MODES} from '../../const/modes';

export default {

    name: 'life',

    extends: baseComponent,

    components: {
        lifeCanvas,
        controlPanel
    },

    data: function() {
        return {
            speed: app.state.speed,
            mode: 0
        };
    },

    created: function() {
        this.mode = MODES.PAUSE;
        this.density = 2;
        this.iterations = 0;
    },

    mounted: function() {

        this.canvas = this.getChildComponent('life-canvas');

        this.cells = {
            cols: this.canvas.width / 10,
            rows: this.canvas.height / 10,
            data: []
        };

        for (var prevCell = null, x = 0; x < this.cells.cols; x++)
        {
            var cols = [];

            for (var y = 0; y < this.cells.rows; y++)
            {
                var cell = {
                    isAlive:     Math.random() * 10 < this.density ? 1:0,
                    readyToBorn: 0,
                    readyToDie:  0,
                    nextCell: null,
                    x: x,
                    y: y
                };

                if (prevCell) {
                    prevCell.nextCell = cell;
                }

                prevCell = cell;

                cols.push(cell);
            }

            this.cells.data.push(cols);
        }

        return this.draw();
    },

    methods: {

        //=============================================================================
        //
        //=============================================================================
        play: function() {
            this.mode = MODES.PLAY;
            return this.draw();
        },

        //=============================================================================
        //
        //=============================================================================
        pause: function() {
            this.mode = MODES.PAUSE;
        },

        //=============================================================================
        //
        //=============================================================================
        action: function(e) {
            return this.mode === MODES.EDIT ?
                this.edit(e):
                this.pass(e);
        },

        //=============================================================================
        //
        //=============================================================================
        startEdit: function() {
            this.mode = MODES.EDIT;
        },

        //=============================================================================
        //
        //=============================================================================
        edit: function(e) {

            var x = Math.floor(e.offsetX / 10);
            var y = Math.floor(e.offsetY / 10);

            this.cells.data[x][y].isAlive ^= 1;

            return this.draw();
        },

        //=============================================================================
        //
        //=============================================================================
        stopEdit: function() {
            this.mode = MODES.PAUSE;
        },

        //=============================================================================
        //
        //=============================================================================
        wait: function() {

            if (this.mode === MODES.PLAY)
            {
                this.timeout = setTimeout(
                    () => this.pass(), this.delay
                );
            }

            return this;
        },

        //=============================================================================
        //
        //=============================================================================
        pass: function() {
            clearTimeout(this.timeout);

            for (var cell = this.cells.data[0][0]; cell.nextCell; cell = cell.nextCell)
            {
                var count = 0;

                /*
                 *  3 x 3
                 */
                for (var x = cell.x - 1; x <= cell.x + 1; x++)
                {
                    for (var y = cell.y - 1; y <= cell.y + 1; y++)
                    {
                        if (x < 0 || y < 0) {
                            continue;
                        }

                        if (x > this.cells.cols - 1 || y > this.cells.rows - 1) {
                            continue;
                        }

                        if (this.cells.data[x][y] === cell) {
                            continue;
                        }

                        if ((this.cells.data[x][y]).isAlive) {
                            count++;
                        }
                    }
                }

                cell.readyToBorn = count === 3;
                cell.readyToDie  = count < 2 || count > 3;
            }

            this.iterations++;

            return this.draw();
        },

        //=============================================================================
        //
        //=============================================================================
        draw: function() {

            var ctx = ctx || this.canvas.virtualCtx;

            for (var cell = this.cells.data[0][0]; cell.nextCell; cell = cell.nextCell)
            {
                if (cell.readyToBorn)
                {
                    cell.isAlive = 1;
                    cell.readyToBorn = 0;
                }

                if (cell.readyToDie)
                {
                    cell.isAlive = 0;
                    cell.readyToDie = 0;
                }

                if (cell.isAlive)
                {
                    var xPos = cell.x * 10 + 1;
                    var yPos = cell.y * 10 + 1;

                    ctx.fillStyle = '#e90';
                    ctx.fillRect(xPos, yPos, 8, 8);
                }
            }

            this.canvas.render();

            return this;
        },

        //=============================================================================
        //
        //=============================================================================
        reset: function(val = this.density) { // ES6 default argument value

            for (var cell = this.cells.data[0][0]; cell.nextCell; cell = cell.nextCell)
            {
                cell.isAlive = Math.random() * 10 < val ? 1:0;
                cell.readyToBorn = 0;
                cell.readyToDie = 0;
            }

            this.iterations = 0;

            return this.draw();
        },

        //=============================================================================
        //
        //=============================================================================
        clear: function() {
            this.reset(0);
        }
    },

    computed: {
        //=============================================================================
        //
        //=============================================================================
        delay: function() {
            return (100 - this.speed.value) * 10;
        },
        //=============================================================================
        //
        //=============================================================================
        status: function() {
            return MODES.LABELS[this.mode];
        },

        //=============================================================================
        //
        //=============================================================================
        isPlayMode: function() {
            return this.mode === MODES.PLAY;
        },

        isPauseMode: function() {
            return this.mode === MODES.PAUSE;
        },

        isEditMode: function() {
            return this.mode === MODES.EDIT;
        }
    }
};
