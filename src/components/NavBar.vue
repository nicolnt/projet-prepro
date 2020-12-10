<template>
  <div class="navBarConnect">
    <vs-navbar v-model="activeItem" color="#ffffff" class="nabarx" id="navBar">
      <div slot="title">
        <vs-navbar-title>
          Nom application
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0">
        <vs-button color="#000000" type="flat" v-on:click="goHome">Déconnexion</vs-button>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>

export default {
  name: 'NavBarAuth',
  data(){
    return {
      activeItem: 0
    }
  },
  methods:{
    goHome() {
      this.$router.push({name:'Home'})
    }
  }
}
</script>

<style scoped>
.navBarConnect{
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.2);
}
#navBar {
  padding: 10px 0;
}

</style>