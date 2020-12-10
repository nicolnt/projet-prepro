<template>
  <div class="navBarAuth">
    <vs-navbar v-model="activeItem" color="#fcfcff" class="nabarx" id="navBar">
      <div slot="title">
        <vs-navbar-title>
          Nom application
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0">
        <vs-button type="flat" v-on:click="goHome">Déconnexion</vs-button>
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
#navBar {
  padding: 10px 0;
}

</style>