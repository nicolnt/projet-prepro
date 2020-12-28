<template>
  <div class="navBarConnect">
    <vs-navbar v-model="activeItem" color="#ffffff" class="nabarx" id="navBar">
      <div slot="title">
        <vs-navbar-title>
          Nom application
        </vs-navbar-title>
      </div>
      <vs-navbar-title id="testName">
        {{ testName }}
      </vs-navbar-title>
      <vs-navbar-item index="0">
        <vs-button color="#000000" type="flat" v-on:click="stopTest">Quitter le test</vs-button>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>

export default {
  name: 'NavBarTest',
  data(){
    return {
      activeItem: 0
    }
  },
  methods:{
    stopTest() {
      this.$router.push({name:'PatientProfil'})
    }
  },
  props: {
    testName: String,
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
#testName {
  margin: auto;
}
.vs-con-items {
  width: 100%;
  background-color: blue;
}
</style>