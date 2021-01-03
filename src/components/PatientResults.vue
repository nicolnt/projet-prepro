<template>
  <div class="patientResults">
    <Hero title="Résultats du patient"/>
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'PatientResults',
  components: {
    Hero,
  },
}
</script>

<style scoped>
.patientResults {
  position: relative;
  text-align: left;
}
.patientResults a {
  position: absolute;
  top: -40px;
  left: -28px;
  font-size: 30px;
  cursor: pointer;
}
</style>