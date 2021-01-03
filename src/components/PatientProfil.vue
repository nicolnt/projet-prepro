<template>
  <div class="patientProfil">
    <Hero title="Profil du patient"/>
    <vs-button color="#9082FF" type="filled" v-on:click="goResults" class="btn">Voir les résultats</vs-button>
    <vs-button color="#9082FF" type="filled" v-on:click="goListTests" class="btn">Démarrer un test</vs-button>
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'PatientProfil',
  components: {
    Hero,
  },
  methods: {
    goResults() {
      this.$router.push({name:'PatientResults'})
    },
    goListTests() {
      this.$router.push({name:'TestList'})
    }
  }
}
</script>

<style scoped>
.patientProfil {
  position: relative;
  text-align: left;
}
.btn {
  border-radius: 16px;
  margin: 10px 0;
}
.patientProfil a {
  position: absolute;
  top: -40px;
  left: -28px;
  font-size: 30px;
  cursor: pointer;
}
</style>