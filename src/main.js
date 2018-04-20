import './styles/reset.css';
import './styles/index.css';
import './styles/fonts/bicubik.css';

import Vue from 'vue';
import life from './components/life/life.vue';

window.app = {
    state: {
        speed: {
            value: 0
        }
    }
};

window.app.root = new Vue({
    el: '#app',
    render: compile => compile(life)
});

export default window.app;