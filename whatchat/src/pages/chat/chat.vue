<template>
<f7-page name="chat">
    <f7-navbar title="Chat" back-link="Back"></f7-navbar>
    <f7-block-title>Chat </f7-block-title>
    <pre>{{friend}}</pre>
</f7-page>
</template>

<script>
export default {
    data() {
        return {
            friend: null
        }
    },
    created() {
        let param = decodeURIComponent(this.$f7route.params.frd)
        this.friend = param
    }
}
</script>
