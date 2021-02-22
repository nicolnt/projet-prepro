<template>
  <div class="navBarDeconnect">
    <vs-navbar v-model="activeItem" v-bind:color="colorBG" class="nabarx" id="navBar">
      <div class="titleApp" v-on:click="goHome" slot="title">
        <vs-navbar-title>
          Tapitap
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0">
        <vs-button v-bind:color="color" type="flat" v-on:click="goSignIn" style="margin-right: 14px;">Connexion</vs-button>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <vs-button v-bind:color="color" type="filled" v-on:click="goSignUp">Inscription</vs-button>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBarAuth',
  props : {
    p_colorBG: {type: String},
    p_color: {type: String}
  },
  data(){
    return {
      colorBG: this.p_colorBG,
      color: this.p_color,
      activeItem: 0
    }
  },
  methods:{
    goSignIn() {
      if(this.$route.name != 'AuthSignIn')
        this.$router.push({name:'AuthSignIn'})
    },
    goSignUp() {
      if(this.$route.name != 'AuthSignUp')
        this.$router.push({name:'AuthSignUp'})
    },
    goHome(){
      if(this.$route.name != 'Home')
        this.$router.push({name:'Home'})
    },
  }
}
</script>

<style scoped>
.navBarDeconnect {
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.2);
}
#navBar {
  padding: 18px 50px;
}
.titleApp {
  cursor: pointer;
}
.vs-button {
  font-size: 16px;
}
</style>