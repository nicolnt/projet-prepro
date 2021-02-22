<template>
  <div class="navBarAuth">
    <vs-navbar v-model="activeItem" v-bind:color="colorBG" class="nabarx" id="navBar">
      <vs-navbar-item index="0">
        <vs-button type="flat" v-bind:text-color="txtColor" v-on:click="goLegalNotice">Mentions légales</vs-button>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <vs-button type="flat" v-bind:text-color="txtColor" v-on:click="goCGU">CGU</vs-button>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  props : {
    p_txtColor: {type: String},
    p_colorBG: {type: String}
  },
  data(){
    return {
      txtColor: this.p_txtColor,
      colorBG: this.p_colorBG,
      activeItem: 0
    }
  },
  methods: {
    goLegalNotice() {
      if(this.$route.name != 'LegalNotice')
        this.$router.push({name:'LegalNotice'})
    },
    goCGU() {
      if(this.$route.name != 'CGU')
        this.$router.push({name:'CGU'})
    }
  }
}
</script>

<style scoped>
#navBar {
  padding: 10px 0;
  justify-content: center;
}
.vs-navbar {
  z-index: 1;
}
.vs-button {
  font-size: 16px;
}
.vs-button-primary.vs-button-flat:hover {
  background: rgba(144, 130, 255, 0.2)!important;
}

</style>