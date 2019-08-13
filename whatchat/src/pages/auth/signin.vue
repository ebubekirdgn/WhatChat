<template>
<f7-page name="signin">
    <f7-navbar title="Sign In"></f7-navbar>

    <f7-list no-hairlines-md>
        <f7-list-input label="E-mail" :value="email" @input="email=$event.target.value" type="email" placeholder="Your e-mail" clear-button>
        </f7-list-input>

        <f7-list-input label="Password" :value="password" @input="password=$event.target.value" type="password" placeholder="Your password" clear-button>
        </f7-list-input>
    </f7-list>

    <f7-block>
        <f7-button outline @click="signIn">Sign In </f7-button>
        <br>
        <div style="text-align:center">
            <f7-link @click="resendEmail" :color="color(time_left)">Resend Confirmation Email <span v-if="time_left > 0"> </span> </f7-link><br>
            <f7-link href="/signup/">Don't have an account? Sign Up</f7-link><br>
            <f7-link>Forgot Password</f7-link>
            <br>
            {{time_left}}
        </div>
    </f7-block>
</f7-page>
</template>

<script>
import {
    setInterval,
    clearInterval
} from 'timers';
export default {
    data() {
        return {
            email: null,
            password: null,
            time_left: -1
        }
    },
    methods: {
        color(timeleft) {
            if (timeleft <= 0) {
                return '#007aff'
            }else{
                return 'gray'
            }
        },
        resendEmail() {
            const self = this

            if (self.time_left <= 0) {
                console.log('trigger resend')
                self.$store.dispatch('sendVerification')
                self.countDown()
            }
        },
        countDown() {
            const self = this
            self.time_left = 20
            var timer = setInterval(function () {
                self.time_left -= 1
                console.log('time_left', self.time_left)
                if (self.time_left <= 0) {
                    clearInterval(timer)
                }
            }, 1000)
        },
        signIn() {
            var payload = {}
            payload.email = this.email
            payload.password = this.password
            this.$store.dispatch('signIn', payload)
        }
    }
}
</script>
