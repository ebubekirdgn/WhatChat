export const mixin = {
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
}