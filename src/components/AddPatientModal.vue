<template lang="html">
  <div id="modalPatient">
    <vs-popup title="Ajouter un patient" :active.sync="popupActivo">
    <div id="modalContent">
      <Input title="Nom" type="text" name="nom" v-bind:value.sync="m_valueLastName" :verifInput="checkInput"/>
      <Input title="Prénom" type="text" name="prenom" v-bind:value.sync="m_valueFirstName" :verifInput="checkInput"/>
      <Input title="Date de naissance" type="date" name="birthday" v-bind:value.sync="m_valueBirthday" :verifInput="checkInput"/>
      <vs-select class="selectExample" label="Sexe" v-model="selectSex">
        <vs-select-item v-bind:key="index" v-bind:value="item.value" v-bind:text="item.text" v-for="(item,index) in options"/>
      </vs-select>
      <Input title="Email" type="email" name="email" v-bind:value.sync="m_valueEmail" :verifInput="checkInput"/>
      <Input title="Adresse" type="text" name="adresse" v-bind:value.sync="m_valueAddress" :verifInput="checkInput"/>
      <Input title="Code postal" type="number" name="cp" v-bind:value.sync="m_valueCp" :verifInput="checkInput"/>
      <Input title="Ville" type="text" name="ville" v-bind:value.sync="m_valueCity" :verifInput="checkInput"/>
      <Input title="Raison passation du test" type="text" name="raisonTest" v-bind:value.sync="m_valueReason" :verifInput="checkInput"/>
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
      m_valueLastName: "",
      m_valueFirstName: "",
      m_valueEmail: "",
      m_valueBirthday: "",
      m_valueAddress: "",
      m_valueCp: "",
      m_valueCity: "",
      m_valueReason : "",
      selectSex: "",
      options:[
        {text: 'Homme', value: 1},
        {text: 'Femme', value: 2},
        {text: 'Autre', value: 3}
      ]
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
.selectExample {
  margin: 10px;
}
.con-select-example {
  display: flex;
  align-items: center;
  justify-content: center;
}
.con-select .vs-select {
  width: 100%
}
.vs-popup--close--icon {
  margin-right: 9%;
  margin-top: 3%;
}
.plane {
  position: absolute;
  top: 17px;
  right: 27%;
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