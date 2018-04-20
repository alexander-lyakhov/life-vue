export default {
    mounted: function() {

        let app = window.app = window.app || {};

        if (!app.componentByID) {
            app.componentByID = {};
        }

        if (!app.componentsByName) {
            app.componentsByName = {};
        }

        if (this.$el.id) {
            app.componentByID[this.$el.id] = this;
        }

        var componentName = this.$options.name;

        if (app.componentsByName[componentName] === undefined) {
            app.componentsByName[componentName] = [];
        }

        app.componentsByName[componentName].push(this);
    },

    methods: {
        //============================================================================
        //
        //============================================================================
        getChildComponent: function(name) {
            return this.$children.find(component => component.$options.name === name);
        },

        //============================================================================
        //
        //============================================================================
        getChildrenComponents: function(name) {
            return this.$children.filter(component => component.$options.name === name);
        }
    }
};