<template>
  <div class="test-navbar">
    <vs-navbar v-model="activeItem" color="#ffffff" class="nabarx" id="navBar">
      <div slot="title">
        <vs-navbar-title>
          Nom application
        </vs-navbar-title>
      </div>
      <span class="test-navbar-title">
        {{ testName }}
      </span>
      <vs-navbar-item index="0">
        <vs-button color="#000000" type="flat" @click="$emit('ToggleQuitModal')">Quitter le test</vs-button>
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
    testName: String
  }
}
</script>

<style scoped>
.test-navbar{
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.2);
}
#navBar {
  padding: 10px 25px;
}
.test-navbar-title {
  font-weight: 600;
  position: absolute;
  width: 100%;
  left: 0;
}

@media only screen and (max-width: 800px) {
  .test-navbar-title {
    position: static;
  }
}
</style>