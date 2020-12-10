<template>
  <div class="stats">
    <NavBar/>
    <h1>Statistiques</h1>
    <Footer p_txtColor="rgb(82, 82, 232)" p_colorBG="#dedfff" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Stats',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style scoped>
.stats {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>