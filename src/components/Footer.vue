<template>
  <div class="navBarAuth">
    <vs-navbar v-model="activeItem" v-bind:color="colorBG" class="nabarx" id="navBar">
      <vs-navbar-item index="0">
        <vs-button type="flat" v-bind:text-color="txtColor">Mentions légales</vs-button>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <vs-button type="flat" v-bind:text-color="txtColor">CGU</vs-button>
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
      colorx:'#8a94db',
      colorx2:'#5252e8',
      activeItem: 0
    }
  }
}
</script>

<style scoped>
#navBar {
  padding: 10px 0;
}

</style>