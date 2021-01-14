<template>
  <div class="psyInformations">
    <Hero title="Informations du psychologue"/>
    <div id="psyDatas">
      <img src="../assets/avatar-woman-illustration.svg" alt="imgPatient" id="imgPatient">
      <h2>{{user.data.displayName}}</h2>
    </div>
    <vs-button color="#9082FF" type="filled" id="btnModif">Modifier les informations</vs-button>
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import { mapGetters } from "vuex"

export default {
  name: 'PsyInformations',
  components: {
    Hero,
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
}
</script>

<style scoped>
.psyInformations {
  position: relative;
  text-align: left;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
#btnModif {
  border-radius: 16px;
}
#psyDatas {
  display: flex;
  flex-direction: row;
  margin: 20px 0;
}
#imgPatient {
  margin-right: 10px;
}
.psyInformations a {
  position: absolute;
  top: -40px;
  left: -28px;
  font-size: 30px;
  cursor: pointer;
}
</style>