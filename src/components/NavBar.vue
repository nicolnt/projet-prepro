<template>
  <div class="navBarConnect">
    <vs-navbar v-model="activeItem" color="#ffffff" class="nabarx" id="navBar">
      <div v-if="user.loggedIn" class="titleApp" v-on:click="goDashboard" slot="title">
        <vs-navbar-title>
          Tapitap
        </vs-navbar-title>
      </div>
      <div v-else class="titleApp" v-on:click="goHome" slot="title">
        <vs-navbar-title>
          Tapitap
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
  },
  methods:{
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // commit pour mutation
          
          this.$router.replace({
            name: "Home"
          });
          //this.$store.commit("SET_LOGGED_OUT")
        });
    },
    goSignIn() {
      if(this.$route.name != 'AuthSignIn')
        this.$router.push({name:'AuthSignIn'})
    },
    goSignUp() {
      if(this.$route.name != 'AuthSignUp')
        this.$router.push({name:'AuthSignUp'})
    },
    goHome() {
      if(this.$route.name != 'Home')
        this.$router.push({name:'Home'})
    },
    goDashboard() {
      if(this.$route.name != 'PatientsList')
        this.$router.push({name:'PatientsList'})
    }
  }
}
</script>

<style scoped>
.navBarConnect{
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.2);
}
#navBar {
  padding: 18px 50px;
}
.vs-navbar {
  z-index: 1;
}
.titleApp {
  cursor: pointer;
}
.vs-button {
  font-size: 16px;
}

@media screen and (max-width: 800px) {
  button >>> .vs-navbar--btn-responsive {
    order: 1;
  }
  .vs-button {
    margin-right: 0;
  }
}
</style>