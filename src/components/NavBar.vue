<template>
  <div class="navBarConnect">
    <vs-navbar v-model="activeItem" color="#ffffff" class="nabarx" id="navBar">
      <div slot="title">
        <vs-navbar-title>
          Nom application
        </vs-navbar-title>
      </div>
      
     <template v-if="user.loggedIn">
      <vs-navbar-item index="0" v-if="user.loggedIn">
        <vs-button color="#000000" type="flat" @click.prevent="signOut">Déconnexion</vs-button>
      </vs-navbar-item>
      </template>
      <template v-else>
        <vs-navbar-item index="0">
          <vs-button v-bind:color="color" type="flat" v-on:click="goSignIn" style="margin-right: 14px;">Connexion</vs-button>
        </vs-navbar-item>
        <vs-navbar-item index="1">
          <vs-button v-bind:color="color" type="filled" v-on:click="goSignUp">Inscription</vs-button>
        </vs-navbar-item>
    </template>
    </vs-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from 'firebase/app'
require('firebase/auth')

export default {
  name: 'NavBarAuth',
  data(){
    return {
      activeItem: 0,
      colorBG: this.p_colorBG,
      color: this.p_color
    }
  },
  props : {
    p_colorBG: {type: String},
    p_color: {type: String}
  },
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },created () {
    console.log(this.user)
  },
  methods:{
    goHome() {
      this.$router.push({name:'Home'})
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home"
          });
        });
    },
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
.navBarConnect{
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.2);
}
#navBar {
  padding: 10px 25px;
}

</style>