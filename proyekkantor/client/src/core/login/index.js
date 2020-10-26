/**
 * @file        : index.js
 * @description : Client's login control
 */

import SignIn from 'core/js/login';

export default {
    data() {
        return {
            appname : process.env.VUE_APP_TITLE,
            username : '',
            password : '',
            error: false,
            errorMessage: ''
        }
    },
    methods : {
        signIn(e) {
            e.preventDefault();
            this.errorMessage = '';
            this.error = false;

            const signIn = new SignIn(this.username, this.password);
            
            signIn.response.then((res) => {
                if (res.status) { 
                    this.errorMessage = res.statusText;
                    this.error = true;
                }
            });
        },
    },
    watch: {
        username(val) {
            this.username = val.toLowerCase();
        }
    },
}