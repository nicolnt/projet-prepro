<template>
  <div class="navBarAuth">
    <vs-navbar v-model="activeItem" color="#dedfff" class="nabarx" id="navBar">
      <div slot="title">
        <vs-navbar-title>
          Nom application
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0">
        <vs-button v-bind:color="colorx" v-bind:gradient-color-secondary="colorx2" type="gradient" v-on:click="goSignUp">Inscription</vs-button>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <vs-button v-bind:color="colorx" v-bind:gradient-color-secondary="colorx2" type="gradient" v-on:click="goSignIn">Connexion</vs-button>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>

export default {
  name: 'NavBarAuth',
  data(){
    return {
      colorx:'#8a94db',
      colorx2:'#5252e8',
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
#navBar {
  padding: 10px 0;
}

</style>