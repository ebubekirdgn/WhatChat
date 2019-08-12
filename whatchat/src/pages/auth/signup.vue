<template>
<f7-page name="signup">
    <f7-navbar title="Sign Up" back-link="Back"></f7-navbar>

    <div class="wrapper">
        <img class="image--cover" :src="image_url" alt @click="launchFilePicker" />
    </div>

    <f7-list no-hairlines-md>
        <f7-list-input label="Your Name" :value="name" @input="name=$event.target.value" type="text" placeholder="Your Name" clear-button></f7-list-input>

        <f7-list-input label="E-mail" :value="email" @input="email=$event.target.value" type="email" placeholder="Your E-mail" clear-button></f7-list-input>

        <f7-list-input label="Password" :value="password" @input="password=$event.target.value" type="password" placeholder="Your password" clear-button></f7-list-input>
    </f7-list>

    <f7-block>
        <f7-button outline @click="signUp">Sign Up</f7-button>
        <input type="file" ref="file" style="display:none;" @change="onFilePicked"/>
    </f7-block>
</f7-page>
</template>

<script>
/*import {
    setTimeout
} from 'timers';*/

import {
    mixin
} from '../../js/mixin'

export default {
    mixins: [mixin],
    data() {
        return {
            name: null,
            email: null,
            password: null,
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
        };
    },
    computed: {
        alert_message() {
            return this.$store.getters.alert_message
        }
    },
    watch: {
        alert_message(value) {
            const sef = this;
            this.showToastBottom(value)
            setTimeout(() => {
                this.$store.commit('setAlertMessage', null)
            }, 200)
        }
    },
    methods: {
        launchFilePicker() {
          this.$refs.file.click()
        },
        onFilePicked(){
            //read the image file
        },
        signUp() {
            const self = this;
            var payload = {};
            payload.name = this.name;
            payload.email = this.email;
            payload.password = this.password;
            payload.photoURL = this.image_url;
            //alert(JSON.stringify(payload))
            this.$store.dispatch("signUp", payload);
        },
        showToastBottom(text) {
            const self = this;
            //Create Toast
            if (!self.toastBottom || self.toastBottom.destroyed) {
                self.toastBottom = self.$f7.toast.create({
                    text: 'This is default bottom',
                    text: text,
                    closeTimeout: 2000,
                    destroyOnClose: true,
                });
            }
            //Open it
            self.toastBottom.open();
        },
    }
};
</script>

<style scoped>
.wrapper {
    text-align: center;
}

.image--cover {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 20px;
    object-fit: cover;
    object-position: center;
}
</style>
