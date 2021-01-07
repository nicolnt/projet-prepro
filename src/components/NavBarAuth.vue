<template>
  <div class="navBarDeconnect">
    <vs-navbar v-model="activeItem" v-bind:color="colorBG" class="nabarx" id="navBar">
      <div slot="title">
        <vs-navbar-title>
          Nom application
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
        this.$router.push({name:'AuthSignIn'})
    },
    goSignUp() {
        this.$router.push({name:'AuthSignUp'})
    }
  }
}
</script>

<style scoped>
.navBarDeconnect {
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.2);
}
#navBar {
  padding: 10px 25px;
}
.vs-button {
  font-size: 16px;
}
</style>