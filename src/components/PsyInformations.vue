<template>
  <div class="psyInformations">
    <Hero title="Informations du psychologue"/>
    <vs-button color="#9082FF" type="filled" id="btnModif">Modifier les informations</vs-button>
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'PsyInformations',
  components: {
    Hero,
  },
}
</script>

<style scoped>
.psyInformations {
  position: relative;
  text-align: left;
}
#btnModif {
  border-radius: 16px;
}
.psyInformations a {
  position: absolute;
  top: -40px;
  left: -28px;
  font-size: 30px;
  cursor: pointer;
}
</style>