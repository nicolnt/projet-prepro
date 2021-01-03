<template lang="html">
  <div id="modalPatient">
    <vs-popup title="Ajouter un patient" :active.sync="popupActivo">
    <div id="modalContent">
      <Input title="Nom" type="text" name="nom" v-bind:value.sync="m_valueLastName" :verifInput="checkInput"/>
      <Input title="Prénom" type="text" name="prenom" v-bind:value.sync="m_valueFirstName" :verifInput="checkInput"/>
      <Input title="Email" type="email" name="email" v-bind:value.sync="m_valueEmail" :verifInput="checkInput"/>
      <vs-button color="#9082FF" type="filled" v-on:click="confirm" id="btnConfirm">Ajouter</vs-button>
      <img class="plane-purple" src="../assets/plane-purple-illustration.svg"/>
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
  position: relative;
  font-family: Poppins;
  background-color: #eaedf0;
  border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.7);    
  width: 475px!important;
  height: 340px!important;
}
#modalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vs-popup--content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 46px);
}
#btnConfirm {
  width: 110px;
  border-radius: 16px;
  margin-top: 1rem;
}
.plane-purple {
  position: absolute;
  top: -19px;
  left: -44px;
}
.vs-popup h3 {
  text-align: center;
}
</style>