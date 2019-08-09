<template>
  <f7-page name="signup">
    <f7-navbar title="Sign Up" back-link="Back"></f7-navbar>

    <div class="wrapper">
        <img class="image--cover" :src="image_url" alt="">
    </div>

    <f7-list no-hairlines-md>
      <f7-list-input label="E-mail" :value="name"  @input="name=$event.target.value" type="text" placeholder="Your Name" clear-button>
      </f7-list-input>

      <f7-list-input label="E-mail" :value="email"  @input="email=$event.target.value" type="email" placeholder="Your e-mail" clear-button>
      </f7-list-input>

      <f7-list-input label="Password" :value="password"  @input="password=$event.target.value" type="password" placeholder="Your password" clear-button>
      </f7-list-input>
    </f7-list>
    
    <f7-block>
      <f7-button outline>Sign Up </f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data(){
    return {
      name:null,
      email:null,
      password:null,
      image_url:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
    }
  }
}
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
}
</style>