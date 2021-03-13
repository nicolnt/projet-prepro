<!-- APP PARAMETERS ON DASHBOARD -->
<template>
  <div class="appParams">
    <Hero title="Paramètres de l'application"/>
    <div class="wrapperPsyInformations">
      <div id="psyDatas">
        <img src="../assets/avatarPsy.svg" alt="imgPatient" id="imgPatient">
        <div class="contentPsyDatas">
          <h2>{{user.data.displayName}}</h2>
          <p>Email : {{user.data.email}}</p>
          <vs-button color="#9082FF" type="filled" class="btnParam" @click="toggleModal">Modifier les informations</vs-button>
          <vs-button color="#9082FF" type="filled" class="btnParam" @click.prevent="signOut">Déconnexion</vs-button>
        </div>
      </div>
      <UpdateDataModal ref="updateDatasModal" :person="user.data" :personType="'psy'"/>
    </div>
    
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import UpdateDataModal from '@/components/UpdateDataModal.vue'
import { mapGetters } from "vuex"

import firebase from 'firebase/app'
require('firebase/auth')

export default {
  name: 'AppParams',
  components: {
    Hero,
    UpdateDataModal
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    toggleModal() {
      this.$refs.updateDatasModal.toggle()
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("SIGN_OUT")
          this.$router.replace({
            name: "Home"
          })
        })
    }
  }
}
</script>

<style scoped>
.appParams {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.wrapperPsyInformations {
  background-color: white;
  box-shadow: 0px 0px 30px -20px rgba(0,0,0,0.25);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  margin-right: 3rem;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
#psyDatas {
  display: flex;
  flex-direction: row;
  margin: 20px 0;
}
.contentPsyDatas {
  margin-left: 2rem;
}
#imgPatient {
  margin-right: 10px;
  width: 14%;
}
.psyInformations a {
  cursor: pointer;
}
.btnParam {
  border-radius: 16px;
  font-size: 16px;
  margin: 1rem 1rem 0 0;
}
</style>