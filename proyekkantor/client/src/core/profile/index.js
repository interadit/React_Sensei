import crypto from "crypto-js";

export default {
    data() {
        return {
            userinfo: this.$store.getters.user ? this.$store.getters.user : {},
            showPassForm: false,
            currentPass: '',
            newPass: '',
            confirmPass: '',
            isInvalid: false,
            errorMessage: '',
            passChangable: false
        };
    },

    beforeCreate() {
        if (!this.userinfo) {
            this.$http.get(`/userinfo`).then(async (response) => {
                this.userinfo = response.data;
            });
        }
    },
    
    methods: {
        togglePasswordForm() {
            this.isInvalid = false;
            this.currentPass = '';
            this.newPass = '';
            this.confirmPass = '';
            this.errorMessage = '';
            this.showPassForm = !this.showPassForm;
        },
        salt() {
            const req = this.$http.create();

            return req.request({
                baseURL: process.env.VUE_APP_LOGIN,
                path: '/',
                method: 'get'
            }).then((response) => {
                return response.data;
            });
        },
        async savePassword() { 
             const data = {
                currentPass: this.currentPass,
                newPass: this.newPass,
                confirmPass: this.confirmPass
            };
            const salt    = await this.salt();
            const encrypt = crypto.AES.encrypt(JSON.stringify(data), salt).toString();
            
            this.$http.post(`/user/changepass`, { _ : encrypt + salt }).then((res) => {
                if (res.data.error) {
                    this.errorMessage = res.data.message;
                    this.isInvalid = true;
                    return;
                }

                if (this.showPassForm) {
                    this.togglePasswordForm();
                }
            }).catch((error) => {
                return error;
            });
        }
    },
    watch: {
        userinfo(newVal) {
            this.passChangable = newVal.username.includes('@') && !newVal.email.includes('@elnusa.co.id');
        }
    }
};