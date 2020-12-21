<template lang="html">
  <div id="modalPatient">
    <vs-popup title="Ajouter un patient" :active.sync="popupActivo">
    <div id="modalContent">
      <Input title="Nom" type="text" name="nom" v-bind:value.sync="m_valueLastName" :verifInput="checkInput"/>
      <Input title="Prénom" type="text" name="prenom" v-bind:value.sync="m_valueFirstName" :verifInput="checkInput"/>
      <Input title="Email" type="email" name="email" v-bind:value.sync="m_valueEmail" :verifInput="checkInput"/>
      <vs-button color="#9082FF" type="filled" v-on:click="confirm" id="btnConfirm">Ajouter</vs-button>
    </div>
    </vs-popup>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'

export default {
  name: 'AddPatientModal',
  data() {
    return { 
      popupActivo: false,
      m_valueLastName : "",
      m_valueFirstName : "",
      m_valueEmail : ""
    }
  },
  components: {
    Input
  },
  methods: {
    toggle() {
      this.popupActivo = !this.open;
    },
    checkInput(value) {
      if(value != null && value != undefined && value != "") {
        return true
      } else {
        return false
      }
    },
    confirm() {
      /*this.checkInput(this.m_valueEmail)
      this.checkInput(this.m_valueLastName)
      this.checkInput(this.m_valueFirstName)*/
      this.popupActivo = !this.popupActivo
    }
  }
}
</script>

<style lang="css">
.vs-popup {
  font-family: Poppins;
  background-color: #eaedf0;
  border: 1px solid #2c3e50;
}
#modalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#btnConfirm {
  border-radius: 16px;
}
</style>