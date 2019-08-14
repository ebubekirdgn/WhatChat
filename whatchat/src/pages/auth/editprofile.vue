<template>
<f7-page name="editprofile">
    <f7-navbar title="Edit Pofile"></f7-navbar>

    <div class="wrapper">
        <img class="image--cover" :src="image_url" alt @click="launchFilePicker" />
    </div>

    <f7-list no-hairlines-md>
        <f7-list-input label="Your Name" :value="display_name" @input="display_name=$event.target.value" type="text" placeholder="Your Name" clear-button></f7-list-input>
    </f7-list>

    <f7-block>
        <f7-button outline @click="updateProfile">Update Profile</f7-button>
        <input type="file" ref="file" style="display:none;" @change="onFilePicked" />
        {{display_name}}
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
        display_name: {
            get: function () {
                return this.$store.getters.display_name
            },
            set: function (newValue) {
                return this.$store.commit('setDisplayName', newValue)
            }
        },
        image_url() {
            return this.$store.getters.image_url
        },
        files() {
            return this.$store.getters.files
        },
        photo_url() {
            return this.$store.getters.photo_url
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
    },
    methods: {
        launchFilePicker() {
            this.$refs.file.click()
        },
        onFilePicked() {
            //read the image file
            this.$store.dispatch("readFile");
        },
        updateProfile(){

        },

        
        /*showToastBottom(text) {
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
        },*/
    },
    created() {
        if (this.photo_url != null) {
            this.$store.commit('setImageURL', this.photo_url);
        }
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
