<template>
  <div class="appParams">
    <NavBar/>
    <h1>Paramètres de l'application</h1>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AppParams',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style scoped>
.appParams {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>