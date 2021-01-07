<template>
  <div class="patientProfil">
    <Hero title="Profil du patient"/>
    <vs-button color="#9082FF" type="filled" v-on:click="goResults" class="btn">Voir les résultats</vs-button>
    <vs-button color="#9082FF" type="filled" v-on:click="goListTests" class="btn">Démarrer un test</vs-button>
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <span class="material-icons" id="icon_back" v-on:click="goPatientsList"> keyboard_backspace </span>
    <div id="patientDatasActions">
      <div id="patientDatas">
        <img src="../assets/google-illustration.svg" alt="imgPatient" id="imgPatient">
        <div id="patientTxtDatas">
          <h1>Nom du patient</h1>
          <h3>Date de naissance</h3>
          <h3>Adresse</h3>
          <p>Motif : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div id="actions">
        <vs-button color="#9082FF" type="filled" class="btn">Modifier les informations</vs-button>
        <vs-button color="#9082FF" type="filled" class="btn">Supprimer ce patient</vs-button>
        <vs-button color="#9082FF" type="filled" v-on:click="goResults" class="btn">Voir les résultats</vs-button>
        <vs-button color="#9082FF" type="filled" v-on:click="goListTests" class="btn">Démarrer un test</vs-button>
      </div>
    </div>
    <h1 id="titleTest">Résultats des 3 derniers tests</h1>
    <div class="tests">
      <div class="testBloc">
        <p>Test 1</p>
      </div>
      <div class="testBloc">
        <p>Test 2</p>
      </div>
      <div class="testBloc">
        <p>Test 3</p>
      </div>
    </div>
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
    },
    goPatientsList() {
      this.$router.push({name:'PatientsList'})
    }
  }
}
</script>

<style scoped>
.patientProfil {
  position: relative;
  text-align: left;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
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
.testBloc {
  background-color: #F0F0F0;
  border-radius: 8px;
  height: 200px;
  width: 20%;
  margin: 40px 3%;
}
.tests {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
#patientDatas {
  display: flex;
  flex-direction: row;
  width: 60%;
}
#patientTxtDatas {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 10px; 
}
#actions {
  background-color: #F0F0F0;
  border-radius: 8px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
}
#patientDatasActions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#titleTest {
  margin-top: 10px;
}
#imgPatient {
  margin: 10px;
}
</style>