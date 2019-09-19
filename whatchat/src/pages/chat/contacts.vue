<template>
<f7-page name="about">
    <f7-navbar title="Contacts" back-link="Back"></f7-navbar>
    <f7-block-title>About My App</f7-block-title>
    <f7-block strong>
        <p>Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt vel quod tenetur nostrum, voluptate omnis quasi quidem illum consequuntur, a, quisquam.</p>
        <p>Laudantium neque magnam vitae nemo quam commodi, in cum dolore obcaecati laborum, excepturi harum, optio qui, consequuntur? Obcaecati dolor sequi nesciunt culpa quia perspiciatis, reiciendis ex debitis, ut tenetur alias.</p>
    </f7-block>
    <pre>{{contacts}}</pre>

</f7-page>
</template>

<script>
export default {
    computed: {
        contacts() {
            return this.$store.getters.contacts
        }
    },
    created(){
      this.$store.dispatch('getAllUsers')
    }
}
</script>>
