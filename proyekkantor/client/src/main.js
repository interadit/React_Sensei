import Vue from 'vue';
import View from './core/app/PageMain';

//core style sheet
import 'core/css/main.less';
//application style sheet
import 'assets/css/main.less'; 

import App from 'core/js/main';
import router from './core/router';
import store from './store/index';

//datatable plugin
//import '@elpi/datatable';
import '@elpi/icon';

Vue.config.productionTip = false;

//app local component
/*
const components = require.context('./components', true, /\.vue$/);

// Load app components
components.keys().forEach((filename) => { 
    Vue.component(filename.split('/')[1], components(filename).default);
}); 
*/

// init apps
new Vue({
    router,
    store,
    data() {
        return {
            route : {}
        }
    },
    watch : {
        $route(to) {
            App.traceRoute(this, to)
        }
    },
    beforeMount() {
        App.authorize(this);
    },
    mounted() {
        App.updateSession(this);
    },
    render : h  => h(View)
}).$mount('#app');