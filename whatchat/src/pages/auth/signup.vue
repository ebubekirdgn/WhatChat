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
        <input type="file" ref="file" style="display:none;" @change="onFilePicked" />
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
        };
    },
    computed: {
        image_url() {
            return this.$store.getters.image_url
        },
        files() {
            return this.$store.getters.files
        },
        signed_up() {
            return this.$store.getters.signed_up
        }
    },
    watch: {
        /*  alert_message(value) {
              const sef = this;
              this.showToastBottom(value)
              setTimeout(() => {
                  this.$store.commit('setAlertMessage', null)
              }, 200)
          }*/
        signed_up(value) {
            if (value == true) {
                this.$f7router.navigate('/signin/')
            }
        }
    },
    methods: {
        launchFilePicker() {
            this.$refs.file.click()
        },
        onFilePicked() {
            //read the image file
            this.$store.dispatch("readFile");
        },
        signUp() {
            const self = this;
            var payload = {};
            payload.name = this.name;
            payload.email = this.email;
            payload.password = this.password;
            payload.photoURL = this.image_url;
            if (self.files) {
                self.$store.dispatch('uploadFile').then(url => {
                    payload.photoURL = url
                    self.$store.dispatch('signUp', payload);
                })
            } else {
                this.$store.dispatch('signUp', payload);
            }

            //alert(JSON.stringify(payload))
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
    },
    created() {
        this.$store.commit('setSignedUp', false)
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
