<template>
  <div class="psyInformations">
    <NavBar/>
    <h1>Informations du psychologue</h1>
    <Footer p_txtColor="rgb(82, 82, 232)" p_colorBG="#fcfcff" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'PsyInformations',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style scoped>
.psyInformations {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>