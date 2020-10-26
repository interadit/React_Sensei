/**
 * @file        : index.js
 * @description : Client's app control
 */
 
 export default {
    data() {
        return {
            toggled : false,
            login   : this.$router.currentRoute.name === 'login',
            menus   : null,
            tabmenus: [],
            infos   : {}
        }
    },

    watch : {
        $route(to) { 
            this.login = to.name === 'login';
        }
    },

    mounted() {
        if (this.$router.currentRoute.name !== 'login') {
            this.getMeta();
        }
    },

    methods : {
        toggle(value) {
            this.toggled = value;
        },

        getMeta() {
            this.$http.get(`/meta_`).then((response) => { 
                let data = response.data;

                this.menus = data.menus;
                this.tabmenus = data.tabmenus;
                this.infos = data.user;

                this.$store.commit('setUser', this.infos);

                if (this.tabmenus) {
                    this.tabmenus.map((tabmenu) => {
                        if (tabmenu.name === 'menu') {
                            tabmenu.menu = this.menus;
                        }
                    });
                }
            }); 
        },
    },
}