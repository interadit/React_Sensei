/**
 * @file        : index.js
 * @description : Page not found handler
 */
 
 export default {
    data() {
        return {
            redirectedRoute: '',
            previousRoute: '',
            fromRoute: ''
        };
    },

    beforeRouteEnter(to, from, next) { 
        next(vm => {
            vm.redirectedRoute = to.redirectedFrom ? to.redirectedFrom : '';
            vm.fromRoute = from.fullPath && from.fullPath !== '/' ? from.fullPath : '';
        });
    },
};