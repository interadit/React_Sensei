import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const subDomain = process.env.VUE_APP_SUBDOMAIN;
const router = new Router({
    base   : subDomain && subDomain === `true` ? `/${process.env.VUE_APP_NAME}` : ``,
    mode   : `history`,
    routes : [
        {
            path: '*',
            redirect: '/404',
        },
        {
            path: '/404',
            name: '404',
            component: require(`@/core/404/PageNotFound.vue`).default
        },
        {
            path: '/login',
            name: 'login',
            component: require(`@/core/login/PageLogin.vue`).default
        },
        {
            path: '/profile',
            name: 'profile',
            component: require(`@/core/profile/PageProfile.vue`).default
        },
        {
            path: '/',
            name: 'home',
            component: require(`@/templates/home/PageHome.vue`).default
        }
    ]
});

export default router;