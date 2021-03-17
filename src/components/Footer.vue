<!-- FOOTER -->
<template>
  <div class="footer">
    <vs-button type="flat" v-bind:text-color="txtColor" v-on:click="goCGU">CGU</vs-button>
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
    goCGU() {
      if(this.$route.name != 'CGU')
        this.$router.push({name:'CGU'})
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: white;
  text-align: center;
  z-index: 1;
  padding: 1rem 0;
}
.vs-button {
  font-size: 16px;
}
.vs-button-primary.vs-button-flat:hover {
  background: rgba(255, 141, 139, 0.2)!important;
}
</style>
