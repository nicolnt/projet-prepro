<template>
  <div class="patientProfil">
    <NavBar/>
    <h1>Profil du patient</h1>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'PatientProfil',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style scoped>
.patientProfil {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>