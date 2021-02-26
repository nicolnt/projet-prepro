<template>
  <div class="footer">
    <div id="navBar">
      <vs-button type="flat" v-bind:text-color="txtColor" v-on:click="goLegalNotice">Mentions légales</vs-button>
      <vs-button type="flat" v-bind:text-color="txtColor" v-on:click="goCGU">CGU</vs-button>
    </div>
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
  background-color: #FFFFFF;
}
.vs-button {
  font-size: 16px;
}
.vs-button-primary.vs-button-flat:hover {
  background: rgba(255, 141, 139, 0.2)!important;
}
</style>
